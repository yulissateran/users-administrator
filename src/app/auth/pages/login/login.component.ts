import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {  tap } from "rxjs/operators";
import {  Subscription, Observable } from "rxjs";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public errorAuth: string | undefined;
  public sent: boolean = false;
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.formLogin = this.getForm();
  }

  getForm(): FormGroup {
    return this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  sendLogin(form):Observable<any> {
    return this._authService.login(form)
    .pipe(
      tap(null, error => {
        this.errorAuth = error;
        return error;
      })
    );
  }

  login(form:FormGroup):null | Subscription {
    this.sent = true;
    console.log('CALLED SERVICE LOGIN', 'FROM IS valid:  ', form.valid);
    if (!this.isValidForm(form))  return null;
      this.errorAuth = undefined;
      return this.sendLogin(form.value).subscribe();
  }

  handleSubbmit(form:FormGroup){
    event.preventDefault();
    this.login(form)
  }

  isValidForm = form => form.valid;

  goRegister() {
  //   this._router.navigate([REGISTER_ROUTE]);
  }
}
