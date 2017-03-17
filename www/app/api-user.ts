import { OnDestroy }  from '@angular/core';
import { ApiService } from './api.service.js';

export class ApiServiceUser {
    private listeners = {};

    constructor(private apiService: ApiService) {}

    public on(event: string, callback: Function): void {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(callback);
        this.apiService.on(event, callback);
    }

    public getAll(event: string, callback: Function): void {
        this.apiService.once(event, callback);
        this.apiService.emit(event);
    }

    public emit(event: string, ...data: any[]): void {
        this.apiService.emit.apply(this.apiService, [event].concat(data));
    }

    public ngOnDestroy() {
        for (let event in this.listeners) {
            for (let listener of this.listeners[event]) {
                this.apiService.removeListener(event, listener);
            }
        }
    }
}
