import {Component,ViewEncapsulation, Directive,OnInit } from '@angular/core';
import { testTableService } from './testTable.service';
import {Contact} from './testTable.model';
import { Observable} from 'rxjs/Observable';
import {DatePickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
import {MdButton, MdIcon} from '@angular/material';
import {AuthHttp} from './AuthHttp';
import {jsonExport} from './jsonExport';
import * as CryptoJS from '../../../../node_modules/crypto-js';

@Component({
  selector: 'new',
  encapsulation: ViewEncapsulation.None,
   styles: [require('./testTable.scss')],
  templateUrl: './testTable.html'
})
export class testTable implements OnInit {

  //
  public clicked:boolean = false;

  public data:any;
  
public tempId :string
  public toggleDP():boolean {
    this.clicked = !this.clicked;
    return !this.clicked;
  }
  //

//
public date:Date
private opened:boolean = false;
public close():void {
  //   this.dt = void 0;
  // }
}
public open():void {
    this.opened = !this.opened;
}

ngOnInit() {
    //this.getCompanies();

    var key = CryptoJS.enc.Base64.parse("#base64Key#");
    var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
    //Impementing the Key and IV
    var encrypted = CryptoJS.AES.encrypt('0', key, {iv: iv});
    this.tempId = encrypted.toString();
  }

public onSelectionDone(a) {
    this.close();
}

public ExportToCSV()
{
  //alert("Call Export function");
  this._json.download(this.data,'sampleCSV');
}

public getDate():number {
    return this.date && this.date.getDate() || new Date().getDate();
}

private clearDate() {
    this.date = null;
}

public constructor(private _http:AuthHttp, private _json:jsonExport)
{



}

//

  //  public dt:Date = new Date();
  // public minDate:Date = void 0;
  // public events:Array<any>;
  // public tomorrow:Date;
  // public afterTomorrow:Date;
  // public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  // public format:string = this.formats[0];
  // public dateOptions:any = {
  //   formatYear: 'YY',
  //   startingDay: 1
  // };
  // private opened:boolean = false;
 
  // public constructor() {
  //   (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
  //   (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
  //   (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
  //   this.events = [
  //     {date: this.tomorrow, status: 'full'},
  //     {date: this.afterTomorrow, status: 'partially'}
  //   ];
  // }
 
  // public getDate():number {
  //   return this.dt && this.dt.getTime() || new Date().getTime();
  // }
 
  // public today():void {
  //   this.dt = new Date();
  // }
 
  // public d20090824():void {
  //   this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
  // }
 
  // // todo: implement custom class cases
  // public getDayClass(date:any, mode:string):string {
  //   if (mode === 'day') {
  //     let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
 
  //     for (let i = 0; i < this.events.length; i++) {
  //       let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
 
  //       if (dayToCheck === currentDay) {
  //         return this.events[i].status;
  //       }
  //     }
  //   }
 
  //   return '';
  // }
 
  // public disabled(date:Date, mode:string):boolean {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // }
 
  // public open():void {
  //   this.opened = !this.opened;
  // }
 
  // public clear():void {
  //   this.dt = void 0;
  // }
 
  // public toggleMin():void {
  //   this.dt = new Date(this.minDate.valueOf());
  // }

  public getCompanies()
  {
    this._http.get('http://localhost:60033/api/Contact')
     .subscribe(data=>{
       this.data=data;
       //alert(JSON.stringify(this.data));
   });
  }
}
