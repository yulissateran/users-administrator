import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/core/models/user";
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ACTION_INIT_LIST_USER, ACTION_LOADED_IFRAME } from 'src/app/constants';

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
    environment.CREATE_USERS_DOMAIN)
  }

  @HostListener("window:message", ["$event"])
  onMessage(event) {
    console.log("event charge users: ", event, event.data);
    if (event.origin !== environment.CREATE_USERS_DOMAIN) return;
    if (event.data.type === ACTION_INIT_LIST_USER) {
      this.users$.next(event.data.payload)
      console.log("this.users$: ", this.users$.value);
    }
  }

  sendAction($event){
    console.log('ACTION RECEVED and sent', $event);
    window.parent.postMessage($event, environment.CREATE_USERS_DOMAIN)
    // this.
  }
}
