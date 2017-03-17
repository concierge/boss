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
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(api) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.title = 'Boss';
        _this.isConnected = true;
        _this.on('connect', function () {
            _this.isConnected = true;
        });
        _this.on('disconnect', function () {
            _this.isConnected = false;
        });
        return _this;
    }
    AppComponent.prototype.shutdown = function () {
        this.emit('directMessage', '/shutdown');
    };
    AppComponent.prototype.restart = function () {
        this.emit('directMessage', '/restart');
    };
    return AppComponent;
}(api_user_js_1.ApiServiceUser));
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'boss-app',
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map