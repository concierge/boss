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
var platform_browser_1 = require("@angular/platform-browser");
var ModulesDashboardComponent = (function (_super) {
    __extends(ModulesDashboardComponent, _super);
    function ModulesDashboardComponent(api, titleService) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.titleService = titleService;
        _this.modules = [];
        _this.loaders = [];
        _this.colours = {
            'system': 'label-default',
            'module': 'label-primary',
            'integration': 'label-success',
            'service': 'label-info',
            '': 'label-warning'
        };
        _this.messageLog = [];
        _this.selectedModule = null;
        _this.getAll('allLoaders', _this.resolveAllLoaders.bind(_this));
        _this.getAll('allModules', _this.addAllModules.bind(_this));
        titleService.setTitle('Modules');
        _this.on('loader_preload', function (data) {
            if (!Array.isArray(data.type))
                data.type = [data.type];
            data.__bossDisable = true;
            _this.modules.push(data);
            _this.sortModules();
        });
        _this.on('loader_load', function (data) {
            var index = _this.modules.findIndex(function (f) { return f.folderPath === data.folderPath; });
            _this.modules[index].__bossDisable = false;
        });
        _this.on('loader_preunload', function (data) {
            var index = _this.modules.findIndex(function (f) { return f.folderPath === data.folderPath; });
            _this.modules[index].__bossDisable = true;
        });
        _this.on('loader_unload', function (data) {
            var index = _this.modules.findIndex(function (f) { return f.folderPath === data.folderPath; });
            _this.modules.splice(index, 1);
        });
        _this.on('directMessage', function (data) {
            _this.messageLog.push(data);
        });
        return _this;
    }
    ModulesDashboardComponent.prototype.sortModules = function () {
        this.modules.sort(function (a, b) {
            if (a.name === b.name)
                return 0;
            return a.name < b.name ? -1 : 1;
        });
    };
    ModulesDashboardComponent.prototype.addAllModules = function (data) {
        this.modules = data;
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var module = _a[_i];
            module.__bossDisable = false;
        }
        this.sortModules();
    };
    ModulesDashboardComponent.prototype.resolveAllLoaders = function (data) {
        this.loaders = data;
    };
    ModulesDashboardComponent.prototype.updateModule = function (module) {
        this.emit('directMessage', "/kpm update " + module.name);
    };
    ModulesDashboardComponent.prototype.unloadModule = function (module) {
        this.emit('directMessage', "/kpm unload " + module.name);
    };
    ModulesDashboardComponent.prototype.reloadModule = function (module) {
        this.emit('directMessage', "/kpm reload " + module.name);
    };
    ModulesDashboardComponent.prototype.uninstallModule = function (module) {
        this.emit('directMessage', "/kpm uninstall " + module.name);
    };
    ModulesDashboardComponent.prototype.getMessageLog = function () {
        var str = '';
        for (var _i = 0, _a = this.messageLog; _i < _a.length; _i++) {
            var message = _a[_i];
            str += message.trim() + "\n";
        }
        return str;
    };
    ModulesDashboardComponent.prototype.clearMessageLog = function () {
        this.messageLog = [];
    };
    ModulesDashboardComponent.prototype.selectModule = function (module) {
        this.selectedModule = module;
    };
    ModulesDashboardComponent.prototype.ngOnDestroy = function () {
        this.selectedModule = null;
        _super.prototype.ngOnDestroy.call(this);
    };
    return ModulesDashboardComponent;
}(api_user_js_1.ApiServiceUser));
ModulesDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'modules-dashboard',
        templateUrl: './modules-dashboard.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService, platform_browser_1.Title])
], ModulesDashboardComponent);
exports.ModulesDashboardComponent = ModulesDashboardComponent;
//# sourceMappingURL=modules-dashboard.component.js.map