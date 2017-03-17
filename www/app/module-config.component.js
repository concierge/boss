"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_jsoneditor_1 = require("ng2-jsoneditor");
var api_service_js_1 = require("./api.service.js");
var api_user_js_1 = require("./api-user.js");
var ModuleConfigComponent = (function (_super) {
    __extends(ModuleConfigComponent, _super);
    function ModuleConfigComponent(api) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.module = null;
        _this.selectedModule = {
            name: 'placeholder'
        };
        _this.data = {};
        _this.editorOptions = new ng2_jsoneditor_1.JsonEditorOptions();
        _this.editorOptions.indentation = 4;
        _this.editorOptions.mode = 'form';
        _this.editorOptions.modes = ['tree', 'view', 'form', 'code', 'text'];
        _this.on('module_config', _this.onNewConfig.bind(_this));
        return _this;
    }
    ModuleConfigComponent.prototype.onNewConfig = function (data) {
        this.data = data;
        if (Object.keys(data).length === 0) {
            this.editor.setMode('code');
        }
        this.editor.set(data);
    };
    ModuleConfigComponent.prototype.ngOnChanges = function () {
        if (this.module) {
            this.selectedModule = this.module;
            this.emit('module_config', this.module.name);
        }
    };
    ModuleConfigComponent.prototype.save = function () {
        var data = this.editor.get();
        this.emit('module_newconfig', this.selectedModule.name, data);
    };
    ModuleConfigComponent.prototype.update = function () {
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm update " + this.selectedModule.name);
    };
    ModuleConfigComponent.prototype.reload = function () {
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm reload " + this.selectedModule.name);
    };
    ModuleConfigComponent.prototype.unload = function () {
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm unload " + this.selectedModule.name);
    };
    ModuleConfigComponent.prototype.uninstall = function () {
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm uninstall " + this.selectedModule.name);
    };
    return ModuleConfigComponent;
}(api_user_js_1.ApiServiceUser));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModuleConfigComponent.prototype, "module", void 0);
__decorate([
    core_1.ViewChild(ng2_jsoneditor_1.JsonEditorComponent),
    __metadata("design:type", ng2_jsoneditor_1.JsonEditorComponent)
], ModuleConfigComponent.prototype, "editor", void 0);
ModuleConfigComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'module-config',
        templateUrl: './module-config.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService])
], ModuleConfigComponent);
exports.ModuleConfigComponent = ModuleConfigComponent;
//# sourceMappingURL=module-config.component.js.map