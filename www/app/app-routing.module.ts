import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulesDashboardComponent }   from './modules-dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/modules', pathMatch: 'full' },
    { path: 'modules',  component: ModulesDashboardComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
