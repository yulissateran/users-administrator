import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserListComponent } from "./user-list.component";
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { environment } from "src/environments/environment";
import { User } from "src/app/core/clases/user";
import { UserAction } from "src/app/core/clases/user-action";
import { postMessageEvent } from "src/app/core/clases/event-post-message";
import {
  INCORRECT_DOMAIN_IFRAME,
  ANY_ACTION,
  ACTION_SEND_USERS_TO_IFRAME
} from "src/app/constants";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from 'src/mocks/angularfire-auth.mock';

describe("UserListComponent", () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent, UserCardComponent],
      providers: [
        {
          provide: AngularFireAuth,
          useClass: AngularFireAuthMock
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(
    "onMessage() should return null if the domain is different to: " +
      environment.APP_DOMAIN,
    () => {
      const event = new postMessageEvent(
        INCORRECT_DOMAIN_IFRAME,
        new UserAction(ANY_ACTION, {})
      );
      component.onMessage(event);
      expect(component.onMessage(event)).toEqual(null);
    }
  );

  it("onMessage() should set users$ with the value in the event if the action is ACTION_SEND_USERS_TO_IFRAME", () => {
    const users = [
      {
        id: 2,
        fullname: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: "Victor Plains Suite 879",
        password: "YulissaT*@",
        enabled: false
      }
    ];
    const event = new postMessageEvent(
      environment.APP_DOMAIN,
      new UserAction(ACTION_SEND_USERS_TO_IFRAME, users)
    );
    component.onMessage(event);
    expect(component.users$.value).toEqual(users);
  });

  // onMessage(event) {
  //   if (event.origin !== environment.APP_DOMAIN) return;
  //   if (event.data.type === ACTION_SEND_USERS_TO_IFRAME) {
  //     this.users$.next(event.data.payload)
  //   }
  // }
});
