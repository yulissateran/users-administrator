import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public user: any;
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.stateSession().subscribe(res => {
      this.user = res;
    });
  }

  logOut() {
    this._authService.logOut();
  }
}
