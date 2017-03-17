import { Component, OnDestroy } from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'error-dashboard',
    templateUrl: './error-dashboard.component.html'
})
export class ErrorDashboardComponent extends ApiServiceUser {
    private errors: Object[] = [];

    constructor(private api: ApiService, private titleService: Title) {
        super(api);
        this.getAll('allUnhandledErrors', this.addAllErrors.bind(this));
        this.on('unhandledError', this.addNewError.bind(this));
        titleService.setTitle('Errors');
    }

    addAllErrors(data: Object[]): void {
        this.errors = data;
    }

    addNewError(data: Object): void {
        this.errors.splice(0, 0, data);
    }

    toJSON(data: Object): string {
        return JSON.stringify(data, null, 4);
    }
}
