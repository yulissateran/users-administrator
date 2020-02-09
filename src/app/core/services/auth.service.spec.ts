import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { AngularFireAuthMock } from "../../../mocks/angularfire-auth.mock";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserMock } from "src/mocks/user-mock";
import { User } from "src/mocks/models/user";
import { ErrorAuth } from '../models/error-auth';
import { LOGIN_ROUTE } from 'src/app/constants';
fdescribe("AuthService", () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
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
      .login("yulissa.lteran@gmail.com", "YulissaT*@")
      .subscribe((response) => {
        expect(Object.keys(response)).toContain('user');
      });
  });

  it("login() should be return an Error object with 'code' and 'message' properties when the authentication is incorrect", async () => {
    // const User: User = UserMock
    service.login('yulissa.lt eran@gmail.com', 'YulissaT*@')
    .subscribe(() => {},
    (error:ErrorAuth) => {
       expect(Object.keys(error)).toEqual(['code', 'message']);
    })
  });

    it("logOut() should navigate to " + LOGIN_ROUTE + " when the session end", async() => {
    service.logOut().then(res=>{
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toContain(LOGIN_ROUTE);
    })
  });

  // it("logOut should be redirect to the login ", () => {?¡¡¡^'
  //   const User: User = UserMock
  //   service.logOut()
  //   .then(response=>{},error=>expect(Object.keys(error)).toEqual(['code','message']))
  // });

  // it("login() should be return an error object when the authentication", () => {
  //   const User: User = UserMock
  //   service.login('yulissa.lteran@gmail.com', 'Yul_issaT*@').subscribe(response=>
  //     expect(typeof response === 'object').toBeTruthy())
  // });
});
