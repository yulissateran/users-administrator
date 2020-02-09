import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";

fdescribe("AuthService", () => {
  let  service: AuthService;

  beforeEach(() =>{
    TestBed.configureTestingModule({
    });
    service = TestBed.get(AuthService)
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
   
  });
});
