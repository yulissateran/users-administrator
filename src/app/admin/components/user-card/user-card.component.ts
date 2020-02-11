import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// import { UserAction } from "src/app/core/models/user-action";
import {
  ACTION_USER_UPDATE,
  ACTION_USER_REMOVE,
  ACTION_USER_ENABLE
} from "src/app/constants";
import { UserAction } from 'src/app/core/clases/user-action';
import { User } from 'src/app/core/clases/user';

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() action: EventEmitter<UserAction> = new EventEmitter();

  isOpen: boolean = false;
  modalActive: boolean = false;
  removeSelected = false;
  typePassword = false;

  constructor() { }

  ngOnInit() { }

  update(id): void {
    const actionUpdate: UserAction = new UserAction(ACTION_USER_UPDATE, { id })
    this.action.emit(actionUpdate);
  }

  remove(id): void {
    const actionRemove: UserAction = new UserAction(ACTION_USER_REMOVE, { id })
    this.action.emit(actionRemove);
  }

  enable(id): void {
    const actionEnable: UserAction = new UserAction(ACTION_USER_ENABLE, { id });
    this.action.emit(actionEnable);
  }

  toggleShowMore(): void {
    this.isOpen = !this.isOpen;
  }

  showConfirmRemoveUser(value) {
    this.removeSelected = value;
  }

  showPass() {
    this.typePassword = !this.typePassword;
  }
}
