import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { CREATE_USERS_ROUTE, REGISTER_ROUTE } from "src/app/constants";
import { ErrorAuth } from '../../../core/models/error-auth';

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
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formLogin = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    event.preventDefault();
    this.sent = true;
    if (this.formLogin.valid) {
      this.errorAuth = undefined;
      this._authService.login(this.formLogin.value).subscribe(
        resp =>{ console.log('resp' , JSON.stringify(resp)) ;this._router.navigate([CREATE_USERS_ROUTE])},
        (error: string) => { console.log('error' , JSON.stringify(error));
        this.errorAuth = error}
      );
    }
  }

  goRegister() {
    this._router.navigate([REGISTER_ROUTE]);
  }


}
