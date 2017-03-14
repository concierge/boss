import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }            from './app-routing.module';
import { ApiService }                  from './api.service'
import { AppComponent }                from './app.component';
import { ModulesDashboardComponent }   from './modules-dashboard.component';
import { ErrorDashboardComponent }     from './error-dashboard.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ModulesDashboardComponent,
        ErrorDashboardComponent
    ],
    providers: [ ApiService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
