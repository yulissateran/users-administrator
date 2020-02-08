import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _angularFire: AngularFireAuth, private _router: Router) {
  }
  
  login() {
    console.log( this._angularFire);
    event.preventDefault();
    // this._angularFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._router.navigate(['admin/create-users']);

    // this._router.navigate(['/home']);
    console.log('redirect');
  }

  logout() {
    // this.auth.signOut();
  }

  ngOnInit() {
  }

}
