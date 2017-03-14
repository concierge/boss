 import * as io from 'socket.io-client';
 import { Injectable } from '@angular/core';
 import { NgZone } from '@angular/core';

 @Injectable()
 export class ApiService {
     private socket: any;
     private zone: NgZone;

     constructor() {
         this.socket = io('/', { path: '/bossEvents' });
         this.zone = new NgZone({enableLongStackTrace: false});
     }

     on(event: string, callback: Function): void {
         this.socket.on(event, (...data: any[]) => {
            this.zone.run(() => {
                callback.apply(this, data);
            });
         });
     }

     emit(event: string, ...data: any[]): void {
         this.socket.emit(event, data);
     }

     removeListeners(event: string): void {
         this.socket.removeAllListeners(event);
     }
 }
