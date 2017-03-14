import { Component } from '@angular/core';
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

    constructor(private apiService: ApiService, private titleService: Title) {
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
}
