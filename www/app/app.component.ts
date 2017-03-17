import { Component }      from '@angular/core';
import { ApiService }     from './api.service.js';
import { ApiServiceUser } from './api-user.js';

@Component({
    moduleId: module.id,
    selector: 'boss-app',
    templateUrl: './app.component.html'
})

export class AppComponent extends ApiServiceUser {
    title = 'Boss';
    private isConnected: boolean = true;

    constructor(private api: ApiService) {
        super(api);
        this.on('connect', () => {
            this.isConnected = true;
        });

        this.on('disconnect', () => {
            this.isConnected = false;
        });
    }

    shutdown(): void {
        this.emit('directMessage', '/shutdown');
    }

    restart(): void {
        this.emit('directMessage', '/restart');
    }
}
