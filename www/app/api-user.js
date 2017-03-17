"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiServiceUser = (function () {
    function ApiServiceUser(apiService) {
        this.apiService = apiService;
        this.listeners = {};
    }
    ApiServiceUser.prototype.on = function (event, callback) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(callback);
        this.apiService.on(event, callback);
    };
    ApiServiceUser.prototype.getAll = function (event, callback) {
        this.apiService.once(event, callback);
        this.apiService.emit(event);
    };
    ApiServiceUser.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.apiService.emit.apply(this.apiService, [event].concat(data));
    };
    ApiServiceUser.prototype.ngOnDestroy = function () {
        for (var event_1 in this.listeners) {
            for (var _i = 0, _a = this.listeners[event_1]; _i < _a.length; _i++) {
                var listener = _a[_i];
                this.apiService.removeListener(event_1, listener);
            }
        }
    };
    return ApiServiceUser;
}());
exports.ApiServiceUser = ApiServiceUser;
//# sourceMappingURL=api-user.js.map