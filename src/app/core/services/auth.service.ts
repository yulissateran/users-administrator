import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor( private _router: Router) {}

  stateSession() {
  }

  login(email: string, pass: string) {

  }

  logOut() {

  }

}
