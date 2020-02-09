import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { AngularFireAuthMock } from "../../../mocks/angularfire-auth.mock";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserMock } from "src/mocks/user-mock";
import { User } from "src/mocks/models/user";
import { ErrorAuth } from "../models/error-auth";
import {
  LOGIN_ROUTE,
  USER_ADMIN_EMAIL,
  USER_ADMIN_PASSWORD,
  NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE,
  NOT_USER_FOUND_ERROR_CODE,
  NOT_USER_FOUND_ERROR_MESSAGE,
  WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE,
  WRONG_PASSWORD_ERROR_CODE,
  WRONG_PASSWORD_ERROR_MESSAGE,
  INVALID_EMAIL_ERROR__DISPLAY_MESSAGE,
  INVALID_EMAIL_ERROR_CODE,
  INVALID_EMAIL_ERROR_MESSAGE
} from "src/app/constants";
fdescribe("AuthService", () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useClass: AngularFireAuthMock
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });
    service = TestBed.get(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("login() should be return an object with  an user property when the authentication is correct", async () => {
    // const User: User = UserMock;
    service
      .login({ email: USER_ADMIN_EMAIL, password: USER_ADMIN_PASSWORD })
      .subscribe(response => {
        expect(Object.keys(response)).toContain("user");
      });
  });

  it(`login() should be return an error message with the message: '${WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE}' when the password was incorrect`, async () => {
    // const User: User = UserMock
    service
      .login({
        email: USER_ADMIN_EMAIL,
        password: USER_ADMIN_PASSWORD + ".*"
      })
      .subscribe(
        () => { },
        (error: ErrorAuth) => {
          expect(Object.keys(error)).toEqual(["code", "message"]);
        }
      );
  });

  // it("logOut() should navigate to " + LOGIN_ROUTE + " when the session end",
  //   async () => {
  //     service.logOut().then(res => {
  //       const spy = routerSpy.navigate as jasmine.Spy;
  //       const navArgs = spy.calls.first().args[0];
  //       expect(navArgs).toContain(LOGIN_ROUTE);
  //     });
  //   });
  it(`handleErrorLogin(error) should return an string with value:  ${NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE}
    for the next coder error:  ${NOT_USER_FOUND_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: NOT_USER_FOUND_ERROR_CODE,
      message: NOT_USER_FOUND_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(
      NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE
    );
  });
  it(`handleErrorLogin(error) should return an string with value:  ${WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE}
      for the next coder error:  ${WRONG_PASSWORD_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: WRONG_PASSWORD_ERROR_CODE,
      message: WRONG_PASSWORD_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(
      WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE
    );
  });

  it(`handleErrorLogin(error) should return an string with value:  ${INVALID_EMAIL_ERROR__DISPLAY_MESSAGE}
          for the next coder error:  ${INVALID_EMAIL_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: INVALID_EMAIL_ERROR_CODE,
      message: INVALID_EMAIL_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(
      INVALID_EMAIL_ERROR__DISPLAY_MESSAGE
    );
  });
});

