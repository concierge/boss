import { Component, OnDestroy } from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'modules-dashboard',
    templateUrl: './modules-dashboard.component.html'
})
export class ModulesDashboardComponent extends ApiServiceUser {
    private modules: Object[] = [];
    private loaders: Object[] = [];
    private colours: Object = {
        'system': 'label-default',
        'module': 'label-primary',
        'integration': 'label-success',
        'service': 'label-info',
        '': 'label-warning'
    };
    private messageLog: string[] = [];
    private selectedModule: Object = null;

    constructor(private api: ApiService, private titleService: Title) {
        super(api);
        this.getAll('allLoaders', this.resolveAllLoaders.bind(this));
        this.getAll('allModules', this.addAllModules.bind(this));
        titleService.setTitle('Modules');

        window.clearMessageLog = () => {
            api.wrapCall(() => {
                this.messageLog = [];
            });
        };

        this.on('loader_preload', (data: Object) => {
            if (!Array.isArray(data.type))
                data.type = [data.type];
            data.__bossDisable = true;
            this.modules.push(data);
            this.sortModules();
        });

        this.on('loader_load', (data: any) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules[index].__bossDisable = false;
        });

        this.on('loader_preunload', (data: any) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules[index].__bossDisable = true;
        });

        this.on('loader_unload', (data: Object) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules.splice(index, 1);
        });

        this.on('directMessage', (data: string) => {
            this.messageLog.push(data);
        });
    }

    sortModules() : void {
        this.modules.sort((a: Object, b: Object) => {
            if (a.name === b.name) return 0;
            return a.name < b.name ? -1 : 1;
        });
    }

    addAllModules(data: Object[]) : void {
        this.modules = data;
        for (let i = 0; i < data.length; i++) {
            data[i].__bossDisable = false;
            data[i].version = data[i].version || 1.0;
        }
        this.sortModules();
    }

    resolveAllLoaders(data: Object[]) :void {
        this.loaders = data;
    }

    updateModule(module: Object) {
        this.emit('directMessage', `/kpm update ${module.name}`);
    }

    unloadModule(module: Object) {
        this.emit('directMessage', `/kpm unload ${module.name}`);
    }

    reloadModule(module: Object) {
        this.emit('directMessage', `/kpm reload ${module.name}`);
    }

    uninstallModule(module: Object) {
        this.emit('directMessage', `/kpm uninstall ${module.name}`);
    }

    getMessageLog(): string {
        let str: string = '';
        for (let message of this.messageLog) {
            str += `${message.trim()}\n`;
        }
        return str;
    }

    clearMessageLog() {
        this.messageLog = [];
    }

    selectModule(module: Object): void {
        this.selectedModule = module;
    }

    getModuleVersionString(module: Object): string {
        if (typeof(module.version) === 'string')
            return module.version;
        return module.version.toPrecision().indexOf('.') >= 0
            ? module.version.toPrecision() + ''
            : module.version.toPrecision() + '.0';
    }

    ngOnDestroy() {
        this.selectedModule = null;
        super.ngOnDestroy();
    }
}
