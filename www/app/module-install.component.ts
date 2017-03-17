import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';

@Component({
    moduleId: module.id,
    selector: 'module-install',
    templateUrl: './module-install.component.html'
})
export class ModuleInstallComponent extends ApiServiceUser {
    private kpmModules: string[] = [];
    private selectedModule: string = '';
    private selectedModuleUrl: string = '';

    constructor(private api: ApiService) {
        super(api);
        this.on('directMessage', this.onDirectMessage.bind(this));
    }

    ngAfterViewInit() {
        $('#moduleInstall').on('shown.bs.modal', e => {
            this.emit('directMessage', '/kpm search');
        });
    }

    onDirectMessage(data: string): void {
        if (data.indexOf('Modules found for your query') < 0)
            return;
        let mods = data.split('-');
        mods.splice(0, 1);
        mods = mods.map(m => m.trim());
        this.kpmModules = mods;
        window.clearMessageLog();
    }

    onKpmListData(data: string[]): void {
        this.kpmModules = data;
        this.clear();
    }

    noInstallToSelect(): boolean {
        return this.kpmModules.length === 0;
    }

    noInstallSelected(): boolean {
        return this.selectedModule.trim() === '' && this.selectedModuleUrl.trim() === '';
    }

    install(): void {
        const mod = this.selectedModule || this.selectedModuleUrl;
        $('#messageLog').modal('show');
        this.emit('directMessage', `/kpm install ${mod}`);
        this.clear();
    }

    clear(): void {
        this.selectedModule = '';
        this.selectedModuleUrl = '';
    }
}
