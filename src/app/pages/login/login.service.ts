import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';


export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class LoginService {
  _state: InternalStateType = {};

  constructor(private _router: Router,  private _http: Http) {
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
