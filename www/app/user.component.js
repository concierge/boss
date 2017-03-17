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
var UserConfigComponent = (function (_super) {
    __extends(UserConfigComponent, _super);
    function UserConfigComponent(api) {
        var _this = _super.call(this, api) || this;
        _this.api = api;
        _this.usersList = [];
        _this.getAll('user_list', _this.onUsersList.bind(_this));
        return _this;
    }
    UserConfigComponent.prototype.onUsersList = function (data) {
        this.usersList = data;
    };
    UserConfigComponent.prototype.isNotEmptyUsername = function () {
        return !!this.username && this.username.trim() !== '';
    };
    UserConfigComponent.prototype.userDoesntExist = function () {
        return !this.usersList.includes(this.username);
    };
    UserConfigComponent.prototype.isNewUser = function () {
        return this.isNotEmptyUsername() && this.userDoesntExist();
    };
    UserConfigComponent.prototype.isExistingUser = function () {
        return this.isNotEmptyUsername() && !this.userDoesntExist();
    };
    UserConfigComponent.prototype.passwordsDontMatch = function () {
        return this.password != this.password2;
    };
    UserConfigComponent.prototype.usernameIsEmpty = function () {
        return !(this.username && this.username.trim() !== '');
    };
    UserConfigComponent.prototype.userFieldText = function () {
        if (!(this.isExistingUser() || this.isNewUser()))
            return 'Username/New User';
        if (this.isExistingUser())
            return 'Username';
        return 'New User';
    };
    UserConfigComponent.prototype.saveButtonText = function () {
        return this.isNewUser() ? 'Add User' : 'Update Password';
    };
    UserConfigComponent.prototype.save = function () {
        this.emit('user_update', {
            username: this.username,
            password: this.password
        });
        this.clear();
    };
    UserConfigComponent.prototype.delete = function () {
        this.emit('user_delete', this.username);
        this.clear();
    };
    UserConfigComponent.prototype.clear = function () {
        this.username = '';
        this.password = '';
        this.password2 = '';
    };
    return UserConfigComponent;
}(api_user_js_1.ApiServiceUser));
UserConfigComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-management',
        templateUrl: './user.component.html'
    }),
    __metadata("design:paramtypes", [api_service_js_1.ApiService])
], UserConfigComponent);
exports.UserConfigComponent = UserConfigComponent;
//# sourceMappingURL=user.component.js.map