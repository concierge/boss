import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request, Connection, ConnectionBackend} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class jsonExport {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _http: Http) { }


public download(data:any,fileName:string){
    // var csvData = this.ConvertToCSV(data);
    // var blob = new Blob([csvData], { type: 'text/csv' });
    // var url= window.URL.createObjectURL(blob);
    // window.open(url);
    var csvData = this.ConvertToCSV(data);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName +'.csv';
    a.click();
}

// convert Json to CSV data in Angular2
    ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            var row = "";
 
            for (var index in objArray[0]) {
                //Now convert each value to string and comma-separated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            str += row + '\r\n';
 
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
 
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
        }

// // Final Code for Download CSV Function
// download(){
//     var csvData = this.ConvertToCSV(this.data);
//     var a = document.createElement("a");
//     a.setAttribute('style', 'display:none;');
//     document.body.appendChild(a);
//     var blob = new Blob([csvData], { type: 'text/csv' });
//     var url= window.URL.createObjectURL(blob);
//     a.href = url;
//     a.download = 'SampleExport.csv';
//     a.click();
// }

}

