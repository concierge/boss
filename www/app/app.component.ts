import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
    moduleId: module.id,
    selector: 'boss-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Boss';
    private isConnected: boolean = true;

    constructor(private apiService: ApiService) {
        apiService.on('connect', () => {
            this.isConnected = true;
        });

        apiService.on('disconnect', () => {
            this.isConnected = false;
        });
    }

    shutdown(): void {
        this.apiService.emit('directMessage', '/shutdown');
    }

    restart(): void {
        this.apiService.emit('directMessage', '/restart');
    }
}
