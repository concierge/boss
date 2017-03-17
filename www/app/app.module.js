"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_jsoneditor_1 = require("ng2-jsoneditor");
var app_routing_module_js_1 = require("./app-routing.module.js");
var api_service_js_1 = require("./api.service.js");
var app_component_js_1 = require("./app.component.js");
var modules_dashboard_component_js_1 = require("./modules-dashboard.component.js");
var error_dashboard_component_js_1 = require("./error-dashboard.component.js");
var module_config_component_js_1 = require("./module-config.component.js");
var user_component_js_1 = require("./user.component.js");
var module_load_component_js_1 = require("./module-load.component.js");
var module_install_component_js_1 = require("./module-install.component.js");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_js_1.AppRoutingModule,
            ng2_jsoneditor_1.JSONEditorModule
        ],
        declarations: [
            app_component_js_1.AppComponent,
            modules_dashboard_component_js_1.ModulesDashboardComponent,
            error_dashboard_component_js_1.ErrorDashboardComponent,
            module_config_component_js_1.ModuleConfigComponent,
            user_component_js_1.UserConfigComponent,
            module_load_component_js_1.ModuleLoadComponent,
            module_install_component_js_1.ModuleInstallComponent
        ],
        providers: [api_service_js_1.ApiService],
        bootstrap: [app_component_js_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map