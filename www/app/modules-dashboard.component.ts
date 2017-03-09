import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modules-dashboard',
    templateUrl: './modules-dashboard.component.html'
})
export class ModulesDashboardComponent implements OnInit {
    modules: Object[] = [];

    constructor() { }

    ngOnInit(): void {}
}
