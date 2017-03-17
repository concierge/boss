 import * as io        from 'socket.io-client';
 import { Injectable } from '@angular/core';
 import { NgZone }     from '@angular/core';

 @Injectable()
 export class ApiService {
     private socket: any;
     private zone: NgZone;

     constructor() {
         this.socket = io('/', { path: '/bossEvents' });
         this.zone = new NgZone({enableLongStackTrace: false});
     }

     wrapCall(callback: Function, data: any): void {
         this.zone.run(() => {
             callback.apply(this, data);
         });
     }

     on(event: string, callback: Function): void {
         this.socket.on(event, (...data: any[]) => {
             this.wrapCall(callback, data);
         });
     }

     once(event: string, callback: Function): void {
         this.socket.once(event, (...data: any[]) => {
             this.wrapCall(callback, data);
         });
     }

     emit(event: string, ...data: any[]): void {
         this.socket.emit(event, data);
     }

     removeListener(event: string, callback: Function): void {
         this.socket.removeListener(event, callback);
     }

     removeListeners(event: string): void {
         this.socket.removeAllListeners(event);
     }
 }
