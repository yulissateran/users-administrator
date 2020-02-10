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
  ACTION_LOADED_IFRAME
} from "src/app/constants";
// import { ModalComponent } from "src/app/admin/components/modal/modal.component";
import { UserAction } from "src/app/core/models/user-action";
import { User } from "src/app/core/models/user";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public userForm: FormGroup;
  public iframeURL: string = environment.LIST_USERS_DOMAIN + LIST_USERS_ROUTE;
  modalActive: boolean = false;
  users$: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      username: "yuli",
      password: "*68Hyt",
      fullname: "yuli teran",
      enabled: true,
      email: "cdc@jkasfhkjsf.com",
      address: "",
      id: "1"
    },
    {
      username: "Anaflavia",
      password: "*68Hcyt",
      fullname: "Anaflavia",
      enabled: true,
      email: "cdc@Anaflavia.com",
      address: "",
      id: "2"
    }
  ]);
  modals = {
    create: {
      title: "Crear Usuario",
      buttonText: "Crear",
    },
    update: {
      title: "Editar Usuario",
      buttonText: "Guardar",
    },
  };
  currentModal: { title: string, buttonText: string };
  @ViewChild("listUsers", { static: true }) iFrame: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  @HostListener("window:message", ["$event"])
  handleMessage(event) {
    if (event.origin !== environment.LIST_USERS_DOMAIN) return;
    const action: UserAction = event.data;
    if (action.type === ACTION_LOADED_IFRAME) {
      this.sendInitData();
    }
    if (action.type === ACTION_USER_UPDATE) {
      this.toggleShowModalUpdate();
    } else {
      this.handleUserAction(action);
    }
  }



  handleUserAction(action: UserAction) {
    let users = this.users$.value;
    switch (action.type) {
      case ACTION_USER_UPDATE:
        users = this.updateUser(users, action.payload);
        break;
      case ACTION_USER_REMOVE:
        users = this.removeUser(users, action.payload);
        break;
      case ACTION_USER_ENABLE:
        users = this.enableUser(users, action.payload);
        break;
      default:
        break;
    }
    this.users$.next(users);
  }

  enableUser(users, { id }) {
    return users.map(user => {
      if (user.id !== id) return user;
      return {
        ...user,
        enabled: !user.enabled
      };
    });
  }

  updateUser(users, { id, updatedUser }) {
    return users.map(user => {
      if (user.id !== id) return user;
      return updatedUser;
    });
  }
  removeUser(users, { id }) {
    return users.filter(user => user.id !== id);
  }

  sendInitData() {
    this.iFrame.nativeElement.contentWindow.postMessage(
      { type: ACTION_INIT_LIST_USER, payload: this.users$.value },
      environment.LIST_USERS_DOMAIN
    );
  }

  toggleShowModalUpdate() {
    this.currentModal = this.modals.update;
    this.toggleShowModal()
  }

  toggleShowModal() {
    this.modalActive = !this.modalActive;
  }

  toggleShowModalCreate() {
    this.currentModal = this.modals.create;
    this.toggleShowModal();
  }

  crearUser() {
  }
  do() {

  }
}
