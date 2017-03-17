import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { JSONEditorModule } from 'ng2-jsoneditor';

import { AppRoutingModule }            from './app-routing.module.js';
import { ApiService }                  from './api.service.js';
import { AppComponent }                from './app.component.js';
import { ModulesDashboardComponent }   from './modules-dashboard.component.js';
import { ErrorDashboardComponent }     from './error-dashboard.component.js';
import { ModuleConfigComponent }       from './module-config.component.js';
import { UserConfigComponent }         from './user.component.js';
import { ModuleLoadComponent }         from './module-load.component.js';
import { ModuleInstallComponent }      from './module-install.component.js';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        JSONEditorModule
    ],
    declarations: [
        AppComponent,
        ModulesDashboardComponent,
        ErrorDashboardComponent,
        ModuleConfigComponent,
        UserConfigComponent,
        ModuleLoadComponent,
        ModuleInstallComponent
    ],
    providers: [ ApiService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
