import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;
  let _afAuth: AngularFireAuth;
  // let 

  beforeEach(() => TestBed.configureTestingModule({}));

  // it('should be created', () => {
  //   const service: AuthService = TestBed.get(AuthService);
  //   expect(service).toBeTruthy();
  // });
});
