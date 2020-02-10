import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { CommonModule, APP_BASE_HREF } from "@angular/common";

import { LoginComponent } from "./login.component";
import { AuthService } from "src/app/core/services/auth.service";
import {
  USER_ADMIN_EMAIL,
  USER_ADMIN_PASSWORD,
  WRONG_PASSWORD_ERROR_MESSAGE,
  WRONG_PASSWORD_ERROR_CODE,
  WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE
} from "src/app/constants";

import { ErrorAuth } from "src/app/core/models/error-auth";
import { throwError, of } from "rxjs";
import { UserMock } from "src/mocks/user-mock";
import { asyncError } from 'src/app/core/functions/async-error';

fdescribe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const getAuthSpy = () => jasmine.createSpyObj("AuthService", ["login"]);
  const formBuilder: FormBuilder = new FormBuilder();
  const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  let authSpy = jasmine.createSpyObj("AuthService", ["login"]);
  const adminUser = {
    email: USER_ADMIN_EMAIL,
    password: USER_ADMIN_PASSWORD
  };
  const invalidValueForm = {
    email: "",
    password: "**4276"
  };
  const invalidPasswordUser = {
    email: USER_ADMIN_EMAIL,
    password: USER_ADMIN_PASSWORD + "--"
  };
  const errorInvalidPassword: ErrorAuth = {
    code: WRONG_PASSWORD_ERROR_CODE,
    message: WRONG_PASSWORD_ERROR_MESSAGE
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule
        // AuthRoutingModule
      ],
      providers: [
        // { provide: APP_BASE_HREF, useValue: '/users-administrator' },
        { provide: AuthService, useValue: authSpy },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    // authSpy = undefined;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`login() shouldn't call to 'AuthService' if  'formLogin' is invalid`, () => {
    component.formLogin.setValue(invalidValueForm);
    component.formLogin.updateValueAndValidity();
    component.login(component.formLogin);
    authSpy = getAuthSpy();
    const spy = authSpy.login as jasmine.Spy;
    expect(spy.calls.count()).toBe(0);
  });

  it(`login() should call to 'AuthService.login' if  'formLogin' is valid`, () => {
    component.formLogin.setValue(adminUser);
    component.formLogin.updateValueAndValidity();
    const spy = authSpy.login as jasmine.Spy;
    spy.calls.reset();
    spy.and.returnValue(
      throwError(new Error(WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE))
    );
    component.login(component.formLogin);
    expect(spy.calls.count()).toBe(1);
  });

  it(`login() should set 'send' as 'true' when it has executed`, () => {
    component.formLogin.setValue(invalidValueForm)
    component.formLogin.updateValueAndValidity();
    component.login(component.formLogin);
    expect(component.sent).toBeTruthy();
  });

  it(`login() should set 'errorAuth' as 'undefined' when it has executed and 'formLogin' is valid`, () => {
    component.formLogin.setValue(adminUser);
    const spy = authSpy.login as jasmine.Spy;
    spy.and.returnValue(of(UserMock));
    component.login(component.formLogin);
    expect(component.errorAuth).toEqual(undefined);
  });

  it(`sendLogin() should set 'errorAuth' as:  ${WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE} when it has executed and 'formLogin' is invalid`, (done: DoneFn) => {
    const spy = authSpy.login as jasmine.Spy;
    spy.and.returnValue(asyncError(WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE));
    component.formLogin.setValue(invalidPasswordUser);
    component.formLogin.updateValueAndValidity();
    component.sendLogin(component.formLogin.value).subscribe(
      response => {},
      error => {
        expect(component.errorAuth).toEqual(WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE);
        done();
      }
    );
  });
});
