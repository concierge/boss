import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'

@Component({
    moduleId: module.id,
    selector: 'modules-dashboard',
    templateUrl: './modules-dashboard.component.html'
})
export class ModulesDashboardComponent implements OnInit {
    modules: Object[] = [];

    constructor(private apiService: ApiService) {
        apiService.on('allModules', this.addAllModules.bind(this));
        apiService.emit('allModules');
    }

    addAllModules(data: Object[]) : void {
        console.log(data);
        this.modules = data;
    }

    ngOnInit(): void {}
}
