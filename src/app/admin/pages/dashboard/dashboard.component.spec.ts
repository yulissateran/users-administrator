import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { postMessageEvent } from "src/app/core/clases/event-post-message";
import {
  INCORRECT_DOMAIN_IFRAME,
  ERROR_DOMAIN_MESSAGE,
  ACTION_USER_UPDATE,
  TITLE_MODAL_UPDATE,
  TEXT_BUTTON_MODAL_UPDATE,
  ACTION_USER_REMOVE,
  ACTION_USER_ENABLE,
  ACTION_CREATE_USER,
  TEXT_BUTTON__MODAL_CREATE,
  TITLE_MODAL_CREATE,
  ANY_ACTION,
  ACTION_LOADED_IFRAME
} from "src/app/constants";
import { UserAction } from "src/app/core/clases/user-action";
import { Modal } from "src/app/core/clases/modal";
import { User } from "src/app/core/clases/user";
import { UsersMock } from "src/mocks/users-mock";

fdescribe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, ModalComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(
    "handlePostMessage() should return an Error object whe the domain is diferent to: " +
      environment.APP_DOMAIN,
    () => {
      const errorPostMessage = component.handlePostMessage(
        new postMessageEvent(INCORRECT_DOMAIN_IFRAME, new UserAction("", ""))
      );
      expect(errorPostMessage.message).toEqual(
        new Error(ERROR_DOMAIN_MESSAGE).message
      );
    }
  );

  it(
    "handlePostMessage() should set currentModal as updateModal when it's called with an action of type:  " +
      ACTION_USER_UPDATE,
    () => {
      const actionUpdate = new UserAction(ACTION_USER_UPDATE, {
        id: 2344234342
      });
      const event = new postMessageEvent(environment.APP_DOMAIN, actionUpdate);
      component.handlePostMessage(event);
      expect(component.currentModal).toEqual(
        new Modal(TITLE_MODAL_UPDATE, TEXT_BUTTON_MODAL_UPDATE)
      );
    }
  );

  it(
    "handlePostMessage() should'n change users$ when the action is :  " +
      ACTION_LOADED_IFRAME,
    () => {
      const usersBeforePostMessage = component.users$.value;
      const actionLoadedIframe = new UserAction(ACTION_LOADED_IFRAME, {
        id: 2344234342
      });
      const event = new postMessageEvent(
        environment.APP_DOMAIN,
        actionLoadedIframe
      );
      component.handlePostMessage(event);
      expect(usersBeforePostMessage).toEqual(component.users$.value);
    }
  );
  it(
    "handlePostMessage() should set users$ with the same value when the action don't match with the cases contempleds:  " +
      ANY_ACTION,
    () => {
      const usersBeforePostMessage = component.users$.value;
      const actionUpdate = new UserAction(ANY_ACTION, {
        id: 2344234342
      });
      const event = new postMessageEvent(environment.APP_DOMAIN, actionUpdate);
      component.handlePostMessage(event);
      expect(usersBeforePostMessage).toEqual(component.users$.value);
    }
  );

  it(
    "handleUserAction() should remove the selected user when receive the action:  " +
      ACTION_USER_REMOVE,
    () => {
      const users: User[] = UsersMock.filter(user => user.id !== 1);
      const actionRemove = new UserAction(ACTION_USER_REMOVE, { id: 1 });
      component.handleUserAction(component.users$.value, actionRemove);
      expect(component.users$.value).toEqual(users);
    }
  );

  it(
    "handleUserAction() should change the property 'enable' to the selected user:  " +
      ACTION_USER_ENABLE,
    () => {
      const actionEnable = new UserAction(ACTION_USER_ENABLE, { id: 2 });
      component.handleUserAction(component.users$.value, actionEnable);
      const userEnabled = component.users$.value.find(user => user.id === 2);
      expect(userEnabled.enabled).toEqual(true);
    }
  );

  it(
    "handleUserAction() should add one user to list of users when receive the action:  " +
      ACTION_CREATE_USER,
    () => {
      const actionCreate = new UserAction(ACTION_CREATE_USER, "");
      const idNewUser = Date.now();
      const newUser = { ...new User(), id: idNewUser };
      component.handleUserAction(component.users$.value, actionCreate, newUser);
      const addedUser = component.users$.value.find(
        user => user.id === idNewUser
      );
      expect(addedUser.id).toEqual(idNewUser);
    }
  );

  it(
    "handleUserAction() should edit the selected user:  " + ACTION_CREATE_USER,
    () => {
      const idUser = 1;
      const actionUpdate = new UserAction(ACTION_USER_UPDATE, {
        id: idUser
      });
      const newUser = { ...new User(), id: idUser };
      component.handleUserAction(component.users$.value, actionUpdate, newUser);
      const modifiedUser = component.users$.value.find(
        user => user.id === idUser
      );
      expect(newUser).toEqual(modifiedUser);
    }
  );

  it(
    "handleUserAction() should return the same users when the action don't make match with the actions contempled:  " +
      ANY_ACTION,
    () => {
      const users = UsersMock;
      const anyAction = new UserAction(ANY_ACTION, {
        id: 0
      });
      component.handleUserAction(component.users$.value, anyAction);
      expect(users).toEqual(component.users$.value);
    }
  );

  it("toggleShowModalCreate() should set currentUser as null:  ", () => {
    component.toggleShowModalCreate();
    expect(component.currentUser$.value).toEqual(null);
  });

  it("toggleShowModalCreate() should set currentModal as createModal:  ", () => {
    const createModal = new Modal(
      TITLE_MODAL_CREATE,
      TEXT_BUTTON__MODAL_CREATE
    );
    component.toggleShowModalCreate();
    expect(component.currentModal).toEqual(createModal);
  });

  it("handleSubmit() should set currentAction as ACTION_CREATE_USER when the modal active is createModal:  ", () => {
    const createModal = new Modal(
      TITLE_MODAL_CREATE,
      TEXT_BUTTON__MODAL_CREATE
    );
    const user = new User();
    const actionCreate = new UserAction(ACTION_CREATE_USER, user);
    component.currentModal = createModal;
    component.handleSubmit(user);
    expect(component.currentAction$.value).toEqual(actionCreate);
  });

  it("handleSubmit() should set currentAction as ACTION_UPDATE_USER when the modal active is updateModal:  ", () => {
    const idUser = 1;
    const actionUpdate = new UserAction(ACTION_USER_UPDATE, {
      id: idUser
    });

    const updateModal = new Modal(TITLE_MODAL_UPDATE, TEXT_BUTTON_MODAL_UPDATE);
    const newUser = { ...new User(), id: idUser };
    component.currentAction$.next(actionUpdate);
    component.currentModal = updateModal;
    component.handleSubmit(newUser);
    const modifiedUser = component.users$.value.find(
      user => user.id === idUser
    );
    expect(newUser).toEqual(modifiedUser);
  });

  it("sendDataToIframe() should return false if iFrame don't exist:  ", () => {
    component.iFrame = null;
    expect(component.sendDataToIframe(UsersMock)).toEqual(false);
  });

  it("sendDataToIframe() should return true if iFrame exist:  ", () => {
    // component.iFrame = null;
    expect(component.sendDataToIframe(UsersMock)).toEqual(true);
  });

});
