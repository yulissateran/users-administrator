import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { AngularFireAuthMock } from "../../../mocks/angularfire-auth.mock";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ErrorAuth } from "../clases/error-auth";

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
  INVALID_EMAIL_ERROR_MESSAGE,
  CREATE_USERS_ROUTE
} from "src/app/constants";

fdescribe("AuthService", () => {
  const getService = () => TestBed.get(AuthService);
  const getRouter = () => jasmine.createSpyObj("Router", ["navigate"]);
  let service: AuthService;
  let routerSpy = getRouter();
  const adminUser = {
    email: USER_ADMIN_EMAIL,
    password: USER_ADMIN_PASSWORD
  };

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
    service = getService();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("login() should return an object with  an user property when the authentication is correct", async (done: DoneFn) => {
    service.login(adminUser).subscribe(response => {
      expect(Object.keys(response)).toContain("user");
      done();
    });
  });

  it(`login() should redirect to ${CREATE_USERS_ROUTE} when the authentication is correct`, async (done: DoneFn) => {
    service.login(adminUser).subscribe(response => {
      const spy = routerSpy.navigate as jasmine.Spy;
      const navArgs = spy.calls.mostRecent().args[0];
      expect(navArgs).toContain(CREATE_USERS_ROUTE);
      done();
    });
  });

  it(`login() should return an error message with the message: '${WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE}' when the password was incorrect`, async (done: DoneFn) => {
    service
      .login({
        email: USER_ADMIN_EMAIL,
        password: USER_ADMIN_PASSWORD + ".*"
      })
      .subscribe(
        () => { },
        (error: string) => {
          expect(error).toEqual(WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE);
          done();
        }
      );
  });

  it(`handleErrorLogin(error) should return an string with value:  ${NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE}
  for the next coder error:  ${NOT_USER_FOUND_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: NOT_USER_FOUND_ERROR_CODE,
      message: NOT_USER_FOUND_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE);
  });

  it(`handleErrorLogin(error) should return an string with value:  ${WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE}
    for the next coder error:  ${WRONG_PASSWORD_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: WRONG_PASSWORD_ERROR_CODE,
      message: WRONG_PASSWORD_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE);
  });

  it(`handleErrorLogin(error) should return an string with value:  ${INVALID_EMAIL_ERROR__DISPLAY_MESSAGE}
        for the next coder error:  ${INVALID_EMAIL_ERROR_CODE}`, async () => {
    const error: ErrorAuth = {
      code: INVALID_EMAIL_ERROR_CODE,
      message: INVALID_EMAIL_ERROR_MESSAGE
    };
    const errorMessageDisplay = service.handleErrorLogin(error);
    expect(errorMessageDisplay).toEqual(INVALID_EMAIL_ERROR__DISPLAY_MESSAGE);
  });

  it(`logOut() should navigate to ${LOGIN_ROUTE}  when the session end`, async (done: DoneFn) => {
    service.logOut().then(res => {
      const spy = routerSpy.navigate as jasmine.Spy;
      const navArgs = spy.calls.mostRecent().args[0];
      expect(navArgs).toContain(LOGIN_ROUTE);
      done();
    });
  });

  it(`stateSession() should return an object when exist user`, async (done: DoneFn) => {
    service.login(adminUser).subscribe(res => {
      service.stateSession().subscribe(
        res => {
          expect(typeof res).toEqual("object");
          done();
        },
        err => { }
      );
    });
  });

  it(`stateSession() should return null when not exist user`, async (done: DoneFn) => {
    service.logOut().then(res => {
      service.stateSession().subscribe(
        res => {
          expect(res).toEqual(null);
          done();
        },
        error => { }
      );
    });
  });
});
