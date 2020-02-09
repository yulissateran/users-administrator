import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from 'src/app/constants';
import { fromPromise } from '../functions/observable-from-promise';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public _aFireAuth: AngularFireAuth, private _router: Router) {}

  stateSession(): Observable<any> {
    return this._aFireAuth.authState;
  }

  register(email: string, pass: string): Observable<string | any> {
    return fromPromise(
      this._aFireAuth.auth.createUserWithEmailAndPassword(email, pass),
      null,
     this.handleErrorRegister)
  }

  login({ email, pass }: { email: string; pass: string; }) {
    console.log(fromPromise, typeof fromPromise)
    return fromPromise(this._aFireAuth.auth.signInWithEmailAndPassword(email, pass), null, null);
  }

  logOut():Promise<any> {
    return this._aFireAuth.auth.signOut()
    .then(res=> this._router.navigate([LOGIN_ROUTE]));
  }

  handleErrorRegister(error) {
    console.log(error)
    switch (error.code) {
      case "auth/network-request-failed":
        return "Por favor revisa tu conección a internet";
      case "auth/invalid-email":
        return "El correo ingresado es inválido";
      case "auth/email-already-in-use":
        return "El correo ingresado ya se encuentra registrado";
      default:
        return "Por favor revisa tu conexión a internet";
    }
  }
}
