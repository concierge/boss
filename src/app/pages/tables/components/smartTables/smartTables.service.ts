import {Injectable} from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import {Contact} from './smartTables.model';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SmartTablesService {
   API_BASE = 'http://localhost:60033/api/Contact';
constructor(private http: Http) { }
  
  metricsTableData = [
    {
      image: 'app/browsers/chrome.svg',
      browser: 'Google Chrome',
      visits: '10,392',
      isVisitsUp: true,
      purchases: '4,214',
      isPurchasesUp: true,
      percent: '45%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/firefox.svg',
      browser: 'Mozilla Firefox',
      visits: '7,873',
      isVisitsUp: true,
      purchases: '3,031',
      isPurchasesUp: false,
      percent: '28%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/ie.svg',
      browser: 'Internet Explorer',
      visits: '5,890',
      isVisitsUp: false,
      purchases: '2,102',
      isPurchasesUp: false,
      percent: '17%',
      isPercentUp: false
    },
    {
      image: 'app/browsers/safari.svg',
      browser: 'Safari',
      visits: '4,001',
      isVisitsUp: false,
      purchases: '1,001',
      isPurchasesUp: false,
      percent: '14%',
      isPercentUp: true
    },
    {
      image: 'app/browsers/opera.svg',
      browser: 'Opera',
      visits: '1,833',
      isVisitsUp: true,
      purchases: '83',
      isPurchasesUp: true,
      percent: '5%',
      isPercentUp: false
    }
  ];

  getData(): Observable<Contact[]> {
        return this.http.get('http://localhost:60033/api/Contact')
            .map((responseData) => {

                return responseData.json();
            })
            .catch(this.handleError);
    }

    getAllData(){
       return this.http.get('http://localhost:60033/api/Contact').map(res => res.json());
   }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    getContact(contactId: number) {
    return this.http.get(this.API_BASE + 'contact/${contactId}')
      .map(data => data.json())
      .catch(this.errorHandler);
  }

  deleteContact(contactId: number) {
    return this.http.delete(this.API_BASE + 'contact/${contactId}')
    .catch(this.errorHandler);
  }

  updateContact(company: Contact){
    let headers = new Headers({'content-type': 'application/json'});
    let options = new ResponseOptions({ headers: headers});

    return this.http.put(this.API_BASE + `company/${company.id}`, JSON.stringify(company), options)
    .map(data => data.json())
    .catch(this.errorHandler);

  }

  private errorHandler(error) {
    console.log('ERROR:', error);
    return Observable.throw(error);
  }

}
