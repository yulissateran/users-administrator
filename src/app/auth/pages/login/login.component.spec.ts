import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AuthRoutingModule } from '../../auth-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/users-administrator' },
        { provide: AuthService, useValue: authService },
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
});
