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
var ErrorDashboardComponent = (function (_super) {
    __extends(ErrorDashboardComponent, _super);
    function ErrorDashboardComponent(api, titleService) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.titleService = titleService;
        _this.errors = [];
        _this.getAll('allUnhandledErrors', _this.addAllErrors.bind(_this));
        _this.on('unhandledError', _this.addNewError.bind(_this));
        titleService.setTitle('Errors');
        return _this;
    }
    ErrorDashboardComponent.prototype.addAllErrors = function (data) {
        this.errors = data;
    };
    ErrorDashboardComponent.prototype.addNewError = function (data) {
        this.errors.splice(0, 0, data);
    };
    ErrorDashboardComponent.prototype.toJSON = function (data) {
        return JSON.stringify(data, null, 4);
    };
    return ErrorDashboardComponent;
}(api_user_js_1.ApiServiceUser));
ErrorDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'error-dashboard',
        templateUrl: './error-dashboard.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService, platform_browser_1.Title])
], ErrorDashboardComponent);
exports.ErrorDashboardComponent = ErrorDashboardComponent;
//# sourceMappingURL=error-dashboard.component.js.map