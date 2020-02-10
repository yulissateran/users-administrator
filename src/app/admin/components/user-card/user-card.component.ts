import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserAction } from "src/app/core/models/user-action";
import {
  ACTION_USER_UPDATE,
  ACTION_USER_REMOVE,
  ACTION_USER_ENABLE
} from "src/app/constants";
import { User } from 'firebase';

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  @Input() user: any; //user
  @Output() action: EventEmitter<UserAction> = new EventEmitter();
  isOpen: boolean = false;
  modalActive: boolean = false;

  constructor() { }

  ngOnInit() { }

  update(id): void {
    const actionUpdate: UserAction = {
      type: ACTION_USER_UPDATE,
      payload: { id }
    };
    this.action.emit(actionUpdate);
  }

  remove(id): void {
    const actionRemove: UserAction = {
      type: ACTION_USER_REMOVE,
      payload: { id }
    };
    this.action.emit(actionRemove);
  }

  enable(id): void {
    const actionEnable: UserAction = {
      type: ACTION_USER_ENABLE,
      payload: { id }
    };
    this.action.emit(actionEnable);
  }

  toggleShowMore(): void {
    this.isOpen = !this.isOpen;
  }
  toggleShowModal() {
    this.modalActive = !this.modalActive;
  }
}
