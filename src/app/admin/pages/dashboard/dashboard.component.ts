import { Component, OnInit, ViewChild, ElementRef, HostListener, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ERROR_DOMAIN_MESSAGE,
  ACTION_USER_UPDATE,
  ACTION_USER_ENABLE,
  ACTION_USER_REMOVE,
  ACTION_SEND_USERS_TO_IFRAME,
  ACTION_LOADED_IFRAME,
  ACTION_CREATE_USER,
  TITLE_MODAL_CREATE,
  TITLE_MODAL_UPDATE,
  TEXT_BUTTON__MODAL_CREATE,
  TEXT_BUTTON_MODAL_UPDATE
} from 'src/app/constants';
import { User } from 'src/app/core/clases/user';
import { environment } from 'src/environments/environment';
import { UserAction } from 'src/app/core/clases/user-action';
import { Modal } from 'src/app/core/clases/modal';
import { postMessageEvent } from 'src/app/core/clases/event-post-message';
import { UsersMock } from 'src/mocks/users-mock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users$: BehaviorSubject<User[]> = new BehaviorSubject(this.getInitialUsers());
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject(null);
  currentAction$: BehaviorSubject<UserAction> = new BehaviorSubject(
    new UserAction('', '')
  );
  modals: { [key: string]: Modal } = this.getModals();
  currentModal: Modal;
  iframeURL: string = environment.IFRAME_ROUTE;
  isActiveModal: boolean = false;
  @ViewChild('listUsers', { static: true }) iFrame: ElementRef;

  successAlert = false;
  msgSuccessAlert = '';

  constructor() { }
  ngOnInit() {
    this.users$.subscribe(users => this.sendDataToIframe(users));
  }

  @HostListener('window:message', ['$event'])
  handlePostMessage({ origin, data }: postMessageEvent) {
    if (origin !== environment.APP_DOMAIN)
      return new Error(ERROR_DOMAIN_MESSAGE);
    const action = data;
    const currentUsers = this.users$.value;
    this.currentAction$.next(action);
    if (action.type === ACTION_LOADED_IFRAME) {
      this.sendDataToIframe(currentUsers);
    } else if (action.type === ACTION_USER_UPDATE) {
      this.toggleShowModalUpdate(
        this.getSelectedUser(currentUsers, action.payload.id)
      );
    } else {
      this.handleUserAction(currentUsers, action);
    }
  }

  getInitialUsers(): User[] {
    return UsersMock
  }

  getModals(): { [key: string]: Modal } {
    return {
      create: new Modal(TITLE_MODAL_CREATE, TEXT_BUTTON__MODAL_CREATE),
      update: new Modal(TITLE_MODAL_UPDATE, TEXT_BUTTON_MODAL_UPDATE)
    };
  }

  sendDataToIframe(users): boolean {
    if (!this.iFrame) return false;
    if (this.iFrame) {
      this.iFrame.nativeElement.contentWindow.postMessage(
        new UserAction(ACTION_SEND_USERS_TO_IFRAME, users),
        environment.APP_DOMAIN
      );
      return true;
    }
  }

  handleUserAction(users, action: UserAction, fromModalUser?) {
    let modifiedUsers = users;
    let msgSuccess = '';
    const { id } = action.payload;
    switch (action.type) {
      case ACTION_USER_UPDATE:
        msgSuccess = 'El usuario fue actualizado exitosamente';
        modifiedUsers = this.updateUser(
          users,
          action.payload.id,
          fromModalUser
        );
        break;
      case ACTION_USER_REMOVE:
        msgSuccess = 'El usuario fue eliminado';
        modifiedUsers = this.removeUser(users, id);
        break;
      case ACTION_USER_ENABLE:
        msgSuccess = 'Se cambió el estado del usuario';
        modifiedUsers = this.enableUser(users, id);
        break;
      case ACTION_CREATE_USER:
        msgSuccess = 'El usuario fue creado exitosamente';
        modifiedUsers = this.addUser(users, fromModalUser);
        break;
      default:
        modifiedUsers = modifiedUsers;
        break;
    }
    this.showSuccessAlert(msgSuccess);
    this.users$.next(modifiedUsers);
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
        this.handleUserAction(
          this.users$.value,
          this.currentAction$.value,
          user
        );
        break;
      case this.modals.update.title:
        this.handleUserAction(
          this.users$.value,
          this.currentAction$.value,
          user
        );
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

  showSuccessAlert(msg) {
    this.successAlert = true;
    this.msgSuccessAlert = msg;
    setTimeout(() => {
      this.closeSuccessAlert();
    }, 5000);
  }

  closeSuccessAlert() {
    this.successAlert = false;
    this.msgSuccessAlert = '';
  }
}
