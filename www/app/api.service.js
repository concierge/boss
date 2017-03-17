"use strict";
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
var io = require("socket.io-client");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var ApiService = (function () {
    function ApiService() {
        this.socket = io('/', { path: '/bossEvents' });
        this.zone = new core_2.NgZone({ enableLongStackTrace: false });
    }
    ApiService.prototype.wrapCall = function (callback, data) {
        var _this = this;
        this.zone.run(function () {
            callback.apply(_this, data);
        });
    };
    ApiService.prototype.on = function (event, callback) {
        var _this = this;
        this.socket.on(event, function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            _this.wrapCall(callback, data);
        });
    };
    ApiService.prototype.once = function (event, callback) {
        var _this = this;
        this.socket.once(event, function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            _this.wrapCall(callback, data);
        });
    };
    ApiService.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.socket.emit(event, data);
    };
    ApiService.prototype.removeListener = function (event, callback) {
        this.socket.removeListener(event, callback);
    };
    ApiService.prototype.removeListeners = function (event) {
        this.socket.removeAllListeners(event);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map