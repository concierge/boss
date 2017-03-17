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
var api_service_js_1 = require("./api.service.js");
var api_user_js_1 = require("./api-user.js");
var ModuleInstallComponent = (function (_super) {
    __extends(ModuleInstallComponent, _super);
    function ModuleInstallComponent(api) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.kpmModules = [];
        _this.selectedModule = '';
        _this.selectedModuleUrl = '';
        _this.on('directMessage', _this.onDirectMessage.bind(_this));
        return _this;
    }
    ModuleInstallComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#moduleInstall').on('shown.bs.modal', function (e) {
            _this.emit('directMessage', '/kpm search');
        });
    };
    ModuleInstallComponent.prototype.onDirectMessage = function (data) {
        if (data.indexOf('Modules found for your query') < 0)
            return;
        var mods = data.split('-');
        mods.splice(0, 1);
        mods = mods.map(function (m) { return m.trim(); });
        this.kpmModules = mods;
        window.clearMessageLog();
    };
    ModuleInstallComponent.prototype.onKpmListData = function (data) {
        this.kpmModules = data;
        this.clear();
    };
    ModuleInstallComponent.prototype.noInstallToSelect = function () {
        return this.kpmModules.length === 0;
    };
    ModuleInstallComponent.prototype.noInstallSelected = function () {
        return this.selectedModule.trim() === '' && this.selectedModuleUrl.trim() === '';
    };
    ModuleInstallComponent.prototype.install = function () {
        var mod = this.selectedModule || this.selectedModuleUrl;
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm install " + mod);
        this.clear();
    };
    ModuleInstallComponent.prototype.clear = function () {
        this.selectedModule = '';
        this.selectedModuleUrl = '';
    };
    return ModuleInstallComponent;
}(api_user_js_1.ApiServiceUser));
ModuleInstallComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'module-install',
        templateUrl: './module-install.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService])
], ModuleInstallComponent);
exports.ModuleInstallComponent = ModuleInstallComponent;
//# sourceMappingURL=module-install.component.js.map