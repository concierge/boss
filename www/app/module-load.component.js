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
var ModuleLoadComponent = (function (_super) {
    __extends(ModuleLoadComponent, _super);
    function ModuleLoadComponent(api) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.unloadedModules = [];
        _this.selectedModule = '';
        return _this;
    }
    ModuleLoadComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#moduleLoad').on('shown.bs.modal', function (e) {
            _this.getAll('unloaded_modules', _this.onUnloadedModules.bind(_this));
        });
    };
    ModuleLoadComponent.prototype.onUnloadedModules = function (data) {
        this.unloadedModules = data;
        this.clear();
    };
    ModuleLoadComponent.prototype.noItemSelected = function () {
        return this.selectedModule.trim() === '';
    };
    ModuleLoadComponent.prototype.noItemsToSelect = function () {
        return this.unloadedModules.length === 0;
    };
    ModuleLoadComponent.prototype.load = function () {
        $('#messageLog').modal('show');
        this.emit('directMessage', "/kpm load " + this.selectedModule);
        this.clear();
    };
    ModuleLoadComponent.prototype.clear = function () {
        this.selectedModule = '';
    };
    return ModuleLoadComponent;
}(api_user_js_1.ApiServiceUser));
ModuleLoadComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'module-load',
        templateUrl: './module-load.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService])
], ModuleLoadComponent);
exports.ModuleLoadComponent = ModuleLoadComponent;
//# sourceMappingURL=module-load.component.js.map