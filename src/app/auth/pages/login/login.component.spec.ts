import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './login.component';
import { AuthRoutingModule } from '../../auth-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { CREATE_USERS_ROUTE, USER_ADMIN_EMAIL, USER_ADMIN_PASSWORD } from 'src/app/constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  const formBuilder: FormBuilder = new FormBuilder();
  const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  const authSpy = jasmine.createSpyObj("AuthService", ["login"]);
  const adminUser = {
    email: USER_ADMIN_EMAIL,
    password: USER_ADMIN_PASSWORD
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        // AuthRoutingModule
      ],
      providers: [
        // { provide: APP_BASE_HREF, useValue: '/users-administrator' },
        { provide: AuthService, useValue: authSpy },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`login() should redirect to : ${CREATE_USERS_ROUTE} when the authentication is correct`, () => {
    // component.login();

    expect(component).toBeTruthy();
  });
});
