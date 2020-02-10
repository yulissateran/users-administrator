import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {
  LOGIN_ROUTE,
  NOT_USER_FOUND_ERROR_CODE,
  NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE,
  WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE,
  INVALID_EMAIL_ERROR__DISPLAY_MESSAGE,
  INVALID_EMAIL_ERROR_CODE,
  WRONG_PASSWORD_ERROR_CODE,
  DEFAULT_ERROR__DISPLAY_MESSAGE,
  CREATE_USERS_ROUTE
} from "src/app/constants";
import { fromPromise } from "../functions/observable-from-promise";
import { ErrorAuth } from '../models/error-auth';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public _aFireAuth: AngularFireAuth, private _router: Router) {}

  stateSession(): Observable<any> {
    return this._aFireAuth.authState;
  }

  // register(email: string, pass: string): Observable<string | any> {
  //   return fromPromise(
  //     this._aFireAuth.auth.createUserWithEmailAndPassword(email, pass),
  //     null,
  //     this.handleErrorRegister
  //   );
  // }

  login({ email, password }: { email: string; password: string }):Observable<any> {
    return fromPromise(
      this._aFireAuth.auth.signInWithEmailAndPassword(email, password),
      this.handleResponseLogin,
      this.handleErrorLogin
    );
  }

  private redirectCreateUsers() {
    return this._router.navigate([CREATE_USERS_ROUTE]);
  }

  logOut(): Promise<any> {
    return this._aFireAuth.auth
      .signOut()
      .then(res => 
        this._router.navigate([LOGIN_ROUTE]));
  }

  // handleErrorRegister(error) {
  //   switch (error.code) {
  //     case "auth/network-request-failed":
  //       return "Por favor revisa tu conección a internet";
  //     case "auth/invalid-email":
  //       return "El correo ingresado es inválido";
  //     case "auth/email-already-in-use":
  //       return "El correo ingresado ya se encuentra registrado";
  //     default:
  //       return "Por favor revisa tu conexión a internet";
  //   }
  // }

  handleErrorLogin(error:ErrorAuth):string {
    // console.log('ErrOR',error);
    let errorDisplayMessage;
    switch (error.code) {
      case NOT_USER_FOUND_ERROR_CODE:
        errorDisplayMessage = NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE;
        break;
      case WRONG_PASSWORD_ERROR_CODE:
        errorDisplayMessage = WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE;
        break;
      case INVALID_EMAIL_ERROR_CODE:
        errorDisplayMessage = INVALID_EMAIL_ERROR__DISPLAY_MESSAGE;
        break;
        // default:
        // errorDisplayMessage = DEFAULT_ERROR__DISPLAY_MESSAGE;
    }
    return errorDisplayMessage;
  }

  handleResponseLogin = (response: any) => {
    this.redirectCreateUsers();
    return response
  }

}
