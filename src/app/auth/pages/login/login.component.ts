import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { CREATE_USERS_ROUTE, REGISTER_ROUTE } from "src/app/constants";
import { ErrorAuth } from "../../../core/models/error-auth";
import { map, catchError } from "rxjs/operators";
import { of, Subject, Subscription } from "rxjs";

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

  getForm() {
    return this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  sendLogin(form) {
    return this._authService.login(form).pipe(
      catchError((error: string) => {
        this.errorAuth = error;
        return of(null);
      })
    );
  }

  login(form:FormGroup):false | Subscription {
    event.preventDefault();
    this.sent = true;
    if (this.isValidForm(form)) {
      this.errorAuth = undefined;
      return this.sendLogin(form.value).subscribe();
    }
  }

  isValidForm = form => form.valid;

  goRegister() {
    this._router.navigate([REGISTER_ROUTE]);
  }
}
