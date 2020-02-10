import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/core/models/user";
import { CREATE_USERS_DOMAIN } from 'src/app/constants';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {

  constructor() { }

  public users: User[] = [
    {
      userName: "yuli",
      password: "*68Hyt",
      fullName: "yuli teran",
      enabled: true,
      email: "cdc@jkasfhkjsf.com",
      adress: "",
      id: '1'
    },
    {
      userName: "Anaflavia",
      password: "*68Hcyt",
      fullName: "Anaflavia",
      enabled: true,
      email: "cdc@Anaflavia.com",
      adress: "",
      id: '2'
    }
  ];
  name: string;
  event: any;

  // toggle
  itemSelected = false;
  itemSelectedID = '';

  // modal
  modalActive = false;

  ngOnInit() { }

  @HostListener("window:message", ["$event"])
  onMessage(event) {
    if(event.origin !== CREATE_USERS_DOMAIN) return;
    // console.log("event charge users: ", event);
    this.name = event.data.name;
    this.event = event;
  }

  updateUser(idUser: string){
    // console.log('idUser: ', idUser)
    window.parent.postMessage(idUser, CREATE_USERS_DOMAIN)
  }

  toggleShowList( id: string) {
    if (!this.itemSelected) {
      this.itemSelected = true;
      this.itemSelectedID = id;
    } else this.itemSelected = false;
  }

  openModal() {
    this.modalActive = !this.modalActive;
  }
}
