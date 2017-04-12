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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'new',
  encapsulation: ViewEncapsulation.None,
  template: '<div>Test2</div>'
})
export class newTestTable implements OnInit {
tempId = this.activatedRoute.snapshot.params['id'];
  //
  public clicked:boolean = false;

  public data:any;
  

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
    var decrypted = CryptoJS.AES.decrypt(decodeURI(this.tempId), key, {iv: iv});
    //alert(this.tempId);
    alert(decrypted.toString(CryptoJS.enc.Utf8));
    
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

public constructor(private _http:AuthHttp, private _json:jsonExport,private activatedRoute: ActivatedRoute,
    private router: Router)
{



}
  public getCompanies()
  {
    this._http.get('http://localhost:60033/api/Contact')
     .subscribe(data=>{
       this.data=data;
       //alert(JSON.stringify(this.data));
   });
  }
}
