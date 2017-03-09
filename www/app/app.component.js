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
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Boss';
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'boss-app',
            template: "\n    <nav class=\"navbar navbar-inverse navbar-static-top\">\n        <div class=\"container-fluid\" style=\"width:100%;height:100%\">\n                <a class=\"navbar-brand\" style=\"height:100%;color:#9d9d9d;padding-top:0.7rem\">\n                    <span class=\"glyphicon glyphicon-console\"></span>\n                    {{title}}\n                </a>\n            <div class=\"navbar-collapse collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                        <a routerLink=\"/dashboard\">Dashboard</a>\n                    </li>\n                    <li routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                        <a routerLink=\"/heroes\">Heroes</a>\n                    </li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li>\n                        <a href=\"https://github.com/concierge/boss/issues\">\n                            <span class=\"glyphicon glyphicon-wrench\"></span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"https://github.com/concierge/Concierge\">\n                            <span class=\"glyphicon glyphicon-info-sign\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>\n    <div class=\"container\">\n        <router-outlet></router-outlet>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map