import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Http, Response,Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  private access_token = localStorage.getItem('access_token');
    private expires_in = localStorage.getItem('expires_in');
    private token_type = localStorage.getItem('token_type');
    private userName = localStorage.getItem('userName');

  constructor(fb:FormBuilder,private _router: Router,  private _http: Http) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    alert(JSON.stringify(values));
    if (this.form.valid) {
      let url = "http://localhost:60033/token";
        let body = "username=" + values['email'] + "&password=" + values['password'] + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers })
      // your code goes here
      // console.log(values);

      this._http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                this._router.navigate(['Dashboard']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }
  }
}
