import { Component, OnInit, OnDestroy } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { passwordValidator } from "../../validators/password.validator";
import { LOGIN_ROUTE, CREATE_USERS_ROUTE } from "src/app/constants";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formRegister: FormGroup;
  public sentForm: boolean = false;
  private subscription: Subscription;
  public errorAuth: string;
  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.formRegister = this._fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      email: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          passwordValidator
        ])
      ]
    });
  }

  register() {
    event.preventDefault();
    this.sentForm = true;
    if (this.formRegister.valid) {
      const { email, password } = this.formRegister.value;
      this.subscription = this._authService
        .register(email, password)
        .subscribe(
          resp => this._router.navigate([CREATE_USERS_ROUTE]),
          error => this.errorAuth = this._authService.handleErrorRegister(error)
        );
    }
  }


  goLogin() {
    this._router.navigate([LOGIN_ROUTE]);
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
