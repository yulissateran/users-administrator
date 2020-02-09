import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { AngularFireAuthMock } from "../../../mocks/angularfire-auth.mock";
import { AngularFireAuth } from "@angular/fire/auth";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { UserMock } from 'src/mocks/user-mock';
import { User } from 'src/mocks/models/user'; 
// import {UserCredential }
fdescribe("AuthService", () => {
  let  service: AuthService;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [
        { 
          provide: AngularFireAuth, 
          useClass: AngularFireAuthMock 
        },
        {
          provide: Router,
          useClass: RouterTestingModule
        }
      ]
    });
    service = TestBed.get(AuthService)
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    service.login('yulissa.lteran@gmail.com', 'YulissaT*@')
    .subscribe(response=>{
      console.log(response)
      // expect(response).toBeTruthy()
    })
  });
  // it("login() should be return an User object when the authentication", () => {
  //   const User: User = UserMock
  //   service.login('yulissa.lteran@gmail.com', 'YulissaT*@')
  //   .subscribe(response=>{
  //     console.log(response)
  //     expect(response).toBeTruthy()
  //   })
  // });

  // it("login() should be return an error object when the authentication", () => {
  //   const User: User = UserMock
  //   service.login('yulissa.lteran@gmail.com', 'Yul_issaT*@').subscribe(response=>
  //     expect(typeof response === 'object').toBeTruthy())
  // });
});
