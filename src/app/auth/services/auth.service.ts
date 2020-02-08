import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { from, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public _afAuth: AngularFireAuth) {}

  stateSession(): any {
    return this._afAuth.authState;
  }

  fromPromise(
    promise,
    handleResponse = response => response,
    handleError = error => error
  ) {
   return new Observable(subscriptor => {
      promise
        .then(response => subscriptor.next(handleResponse(response)))
        .catch(error => subscriptor.error(handleError(error)));
    });
  }
  register(email: string, pass: string): Observable<string | any> {
    return this.fromPromise(
      this._afAuth.auth.createUserWithEmailAndPassword(email, pass),
      (response)=>response,
     this.handleErrorRegister)
  }
  login(email: string, pass: string) {
    return from(this._afAuth.auth.signInWithEmailAndPassword(email, pass));
  }

  logoutUser() {
    return this._afAuth.auth.signOut();
  }
  handleErrorRegister(error) {
    switch (error.code) {
      case "auth/network-request-failed":
        return "Por favor revisa tu conección a internet";
      case "auth/invalid-email":
        return "El correo ingresado es inválido";
      case "auth/email-already-in-use":
        return "El correo ingresado ya se encuentra registrado";
      default:
        return "Por favor revisa tu conección a internet";
    }
  }
}
