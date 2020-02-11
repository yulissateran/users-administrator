import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  LIST_USERS_ROUTE,
  ACTION_USER_UPDATE,
  ACTION_USER_ENABLE,
  ACTION_USER_REMOVE,
  ACTION_INIT_LIST_USER,
  ACTION_LOADED_IFRAME,
  ACTION_CREATE_USER
} from "src/app/constants";
import { User } from "src/app/core/clases/user";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserAction } from "src/app/core/clases/user-action";
import { Modal } from "src/app/core/clases/modal";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject(this.getInitialUsers());
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject(null);
  currentAction$: BehaviorSubject<UserAction> = new BehaviorSubject(
    new UserAction("", "")
  );
  modals: { [key: string]: Modal } = this.getModals();
  currentModal: Modal;
  iframeURL: string = environment.IFRAME_ROUTE;
  isActiveModal: boolean = false;
  @ViewChild("listUsers", { static: true }) iFrame: ElementRef;

  constructor() {}
  ngOnInit() {
    this.users$.subscribe(users => this.sendDataToIframe(users));
  }

  @HostListener("window:message", ["$event"])
  handleMessage({
    origin,
    data: action
  }: {
    origin: string;
    data: UserAction;
  }) {
    if (origin !== environment.APP_DOMAIN) return;
    this.currentAction$.next(action);
    const currentUsers = this.users$.value;
    if (action.type === ACTION_LOADED_IFRAME) {
      this.sendDataToIframe(currentUsers);
    }
    if (action.type === ACTION_USER_UPDATE) {
      this.toggleShowModalUpdate(this.getSelectedUser(currentUsers, action.payload.id));
    } else {
      this.handleUserAction(currentUsers, action);
    }
  }

  getInitialUsers(): User[] {
    return [
      {
        username: "yuli",
        password: "*68Hyt",
        fullname: "yuli teran",
        enabled: true,
        email: "cdc@jkasfhkjsf.com",
        address: "",
        id: 196676736554534234566666674564
      },
      {
        username: "Anaflavia",
        password: "*68Hcyt",
        fullname: "Anaflavia",
        enabled: true,
        email: "cdc@Anaflavia.com",
        address: "",
        id: 5453747365556441963332
      }
    ];
  }
  getModals(): { [key: string]: Modal } {
    return {
      create: new Modal("Crear Usuario", "Crear"),
      update: new Modal("Editar Usuario", "Guardar")
    };
  }

  handleUserAction(users, action: UserAction, fromModalUser?) {
    let modifiedUsers = users;
    const { id } = action.payload;
    switch (action.type) {
      case ACTION_USER_UPDATE:
        modifiedUsers = this.updateUser(
          users,
          action.payload.id,
          fromModalUser
        );
        break;
      case ACTION_USER_REMOVE:
        modifiedUsers = this.removeUser(users, id);
        break;
      case ACTION_USER_ENABLE:
        modifiedUsers = this.enableUser(users, id);
        break;
      case ACTION_CREATE_USER:
        modifiedUsers = this.addUser(users, fromModalUser);
        break;
      default:
        modifiedUsers = modifiedUsers;
        break;
    }
    this.users$.next(modifiedUsers);
  }



  sendDataToIframe(users) {
    this.iFrame.nativeElement.contentWindow.postMessage(
      { type: ACTION_INIT_LIST_USER, payload: users },
      environment.APP_DOMAIN
    );
  }

  toggleShowModalUpdate(user) {
    this.currentUser$.next(user);
    this.currentModal = this.modals.update;
    this.toggleShowModal();
  }

  toggleShowModal() {
    this.isActiveModal = !this.isActiveModal;
  }

  toggleShowModalCreate() {
    this.currentUser$.next(null);
    this.currentModal = this.modals.create;
    this.toggleShowModal();
  }

  handleSubmit(user) {
    this.toggleShowModal();
    switch (this.currentModal.title) {
      case this.modals.create.title:
        this.currentAction$.next(new UserAction(ACTION_CREATE_USER, user));
        this.handleUserAction(this.currentAction$.value, user);
        break;
      case this.modals.update.title:
        this.handleUserAction(this.currentAction$.value, user);
        break;
    }
  }










  enableUser(users, id) {
    return users.map(user => {
      if (user.id !== id) return user;
      return {
        ...user,
        enabled: !user.enabled
      };
    });
  }

  updateUser(users, id, updatedUser) {
    return users.map(user => {
      if (user.id !== id) return user;
      return updatedUser;
    });
  }
  addUser(users, user) {
    return [user, ...users];
  }

  removeUser(users, id) {
    return users.filter(user => user.id !== id);
  }

  getSelectedUser(users, id) {
    return users.find(user => user.id === id);
  }
}
