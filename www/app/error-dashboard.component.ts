import { Component, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'error-dashboard',
    templateUrl: './error-dashboard.component.html'
})
export class ErrorDashboardComponent implements OnDestroy {
    private errors: Object[] = [];

    constructor(private apiService: ApiService, private titleService: Title) {
        apiService.on('allUnhandledErrors', this.addAllErrors.bind(this));
        apiService.emit('allUnhandledErrors');
        titleService.setTitle('Errors');
        apiService.on('unhandledError', this.addNewError.bind(this));
        this.apiService = apiService;
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

    ngOnDestroy() {
        this.apiService.removeListeners('allUnhandledErrors');
        this.apiService.removeListeners('unhandledError');
    }
}
