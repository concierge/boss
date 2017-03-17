import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';

@Component({
    moduleId: module.id,
    selector: 'module-load',
    templateUrl: './module-load.component.html'
})
export class ModuleLoadComponent extends ApiServiceUser {
    private unloadedModules: string[] = [];
    private selectedModule: string = '';

    constructor(private api: ApiService) {
        super(api);
    }

    ngAfterViewInit() {
        $('#moduleLoad').on('shown.bs.modal', e => {
            this.getAll('unloaded_modules', this.onUnloadedModules.bind(this));
        });
    }

    onUnloadedModules(data: string[]): void {
        this.unloadedModules = data;
        this.clear();
    }

    noItemSelected(): boolean {
        return this.selectedModule.trim() === '';
    }

    noItemsToSelect(): boolean {
        return this.unloadedModules.length === 0;
    }

    load(): void {
        $('#messageLog').modal('show');
        this.emit('directMessage', `/kpm load ${this.selectedModule}`);
        this.clear();
    }

    clear(): void {
        this.selectedModule = '';
    }
}
