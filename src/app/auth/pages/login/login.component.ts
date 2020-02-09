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
      const { email, password } = this.formLogin.value;
      this._authService.login({ email, pass: password }).subscribe(
        resp =>{ console.log('resp' , JSON.stringify(resp)) ;this._router.navigate([CREATE_USERS_ROUTE])},
        (error: ErrorAuth) => { console.log('error' , JSON.stringify(error));
        this.errorAuth = error.message}
      );
    }
  }

  goRegister() {
    this._router.navigate([REGISTER_ROUTE]);
  }

//   handleError(error){
//    switch (error.code) {
//   case value:
    
//     break;

//   default:
//     break;
// }
//   }
//no existe usuario
  // {"code":"auth/user-not-found",
  // "message":"There is no user record corresponding to this identifier. The user may have been deleted."}
// password invalido
  // {"code":"auth/wrong-password","message":"The password is invalid or the user does not have a password."}
  //email invalido
  // {"code":"auth/invalid-email","message":"The email address is badly formatted."}

}
