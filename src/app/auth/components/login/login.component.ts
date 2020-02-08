import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(
    public _angularFire: AngularFireAuth,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.formLogin = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    console.log(this._angularFire);
    event.preventDefault();
    // this._angularFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._router.navigate(["admin/create-users"]);

    // this._router.navigate(['/home']);
    console.log("redirect");
  }

  logout() {
    // this.auth.signOut();
  }

  ngOnInit() {}
}
