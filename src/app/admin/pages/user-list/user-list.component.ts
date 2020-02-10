import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/core/models/user";
import { CREATE_USERS_DOMAIN } from 'src/app/constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {

  constructor() { }

  public users$: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      username: "yuli",
      password: "*68Hyt",
      fullname: "yuli teran",
      enabled: false,
      email: "cdc@jkasfhkjsf.com",
      address: "Urb Jiron",
      id: '1'
    },
    {
      username: "Anaflavia",
      password: "*68Hcyt",
      fullname: "Anaflavia",
      enabled: true,
      email: "cdc@Anaflavia.com",
      address: "Los libertadores",
      id: '2'
    }
  ])
  name: string;
  event: any;
  ngOnInit() { }

  @HostListener("window:message", ["$event"])
  onMessage(event) {
    // alert(event.data)
    console.log("event charge users: ", event, event.data);

    if(event.origin !== CREATE_USERS_DOMAIN) return;
    console.log("event charge users: ", event, event.data);
    this.users$.next(JSON.parse(event.data))
    // this.name = event.data.name;
    // this.event = event;
  }

  sendAction($event){
    console.log('ACTION RECEVED and sent',$event);
    window.parent.postMessage($event, CREATE_USERS_DOMAIN)
    // this.
  }
}
