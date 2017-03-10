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
    }

    addAllModules(data: Object[]) : void {
        this.modules = data;
    }

    resolveAllLoaders(data: Object[]) :void {
        this.loaders = data;
    }
}
