import { Component, OnDestroy, Input, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ng2-jsoneditor';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';

@Component({
    moduleId: module.id,
    selector: 'module-config',
    templateUrl: './module-config.component.html'
})
export class ModuleConfigComponent extends ApiServiceUser {
    @Input()
    public module: Object = null;
    private selectedModule = {
        name: 'placeholder'
    };
    private data: any = {};
    public editorOptions: JsonEditorOptions;

    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

    constructor(private api: ApiService) {
        super(api);
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.indentation = 4;
        this.editorOptions.mode = 'form';
        this.editorOptions.modes = ['tree', 'view', 'form', 'code', 'text'];
        this.on('module_config', this.onNewConfig.bind(this))
    }

    onNewConfig(data: any): void {
        this.data = data;
        if (Object.keys(data).length === 0) {
            this.editor.setMode('code');
        }
        this.editor.set(data);
    }

    ngOnChanges() {
        if (this.module) {
            this.selectedModule = this.module;
            this.emit('module_config', this.module.name);
        }
    }

    save(): void {
        const data = this.editor.get();
        this.emit('module_newconfig', this.module.name, data);
    }

    update(): void {
        this.emit('directMessage', `/kpm update ${module.name}`);
    }

    reload(): void {
        this.emit('directMessage', `/kpm reload ${module.name}`);
    }

    unload(): void {
        this.emit('directMessage', `/kpm unload ${module.name}`);
    }

    uninstall(): void {
        this.emit('directMessage', `/kpm uninstall ${module.name}`);
    }
}
