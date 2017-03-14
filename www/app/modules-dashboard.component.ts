import { Component, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'modules-dashboard',
    templateUrl: './modules-dashboard.component.html'
})
export class ModulesDashboardComponent {
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

    constructor(private apiService: ApiService, private titleService: Title) {
        this.apiService = apiService;
        apiService.on('allLoaders', this.resolveAllLoaders.bind(this));
        apiService.emit('allLoaders');
        apiService.on('allModules', this.addAllModules.bind(this));
        apiService.emit('allModules');
        titleService.setTitle('Modules');

        apiService.on('loader_preload', (data: Object) => {
            if (!Array.isArray(data.type))
                data.type = [data.type];
            data.__bossDisable = true;
            this.modules.push(data);
            this.sortModules();
        });

        apiService.on('loader_load', (data: any) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules[index].__bossDisable = false;
        });

        apiService.on('loader_preunload', (data: any) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules[index].__bossDisable = true;
        });

        apiService.on('loader_unload', (data: Object) => {
            const index = this.modules.findIndex(f => f.folderPath === data.folderPath);
            this.modules.splice(index, 1);
        });

        apiService.on('directMessage', (data: string) => {
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
        for (let module of this.modules) {
            module.__bossDisable = false;
        }
        this.sortModules();
    }

    resolveAllLoaders(data: Object[]) :void {
        this.loaders = data;
    }

    updateModule(module: Object) {
        this.apiService.emit('directMessage', `/kpm update ${module.name}`);
    }

    unloadModule(module: Object) {
        this.apiService.emit('directMessage', `/kpm unload ${module.name}`);
    }

    reloadModule(module: Object) {
        this.apiService.emit('directMessage', `/kpm reload ${module.name}`);
    }

    uninstallModule(module: Object) {
        this.apiService.emit('directMessage', `/kpm uninstall ${module.name}`);
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

    ngOnDestroy() {
        this.apiService.removeListeners('allLoaders');
        this.apiService.removeListeners('allModules');
        this.apiService.removeListeners('loader_preload');
        this.apiService.removeListeners('loader_load');
        this.apiService.removeListeners('loader_preunload');
        this.apiService.removeListeners('loader_unload');
        this.apiService.removeListeners('directMessage');
    }
}
