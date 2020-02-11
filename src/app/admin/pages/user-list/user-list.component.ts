import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/core/clases/user";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ACTION_SEND_USERS_TO_IFRAME, ACTION_LOADED_IFRAME } from 'src/app/constants';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {

  constructor() { }

  public users$: BehaviorSubject<User[]> = new BehaviorSubject([])
  name: string;
  event: any;

  ngOnInit() {
    window.parent.postMessage({ type: ACTION_LOADED_IFRAME },
    environment.APP_DOMAIN)
  }

  @HostListener("window:message", ["$event"])
  onMessage(event) {
    console.log("event charge users: ", event, event.data);
    if (event.origin !== environment.APP_DOMAIN) return;
    if (event.data.type === ACTION_SEND_USERS_TO_IFRAME) {
      this.users$.next(event.data.payload)
      console.log("this.users$: ", this.users$.value);
    }
  }

  sendAction($event){
    console.log('ACTION RECEVED and sent', $event);
    window.parent.postMessage($event, environment.APP_DOMAIN)
    // this.
  }
}
