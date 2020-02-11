import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UserCardComponent } from "./user-card.component";
import { UserAction } from "src/app/core/clases/user-action";
import {
  ACTION_USER_UPDATE,
  ACTION_USER_REMOVE,
  ACTION_USER_ENABLE
} from "src/app/constants";

fdescribe("UserCardComponent", () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    const user = {
      id: Date.now(),
      fullname: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: "Kulas Light Apt. 556",
      password: "YulissaT*@",
      enabled: true
    };
    component.user = user;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("update(id) should emit an ACTION_USER_UPDATE", () => {
    let emitedAction: UserAction;
    let expectedAction: UserAction = new UserAction(ACTION_USER_UPDATE, {
      id: component.user.id
    });
    component.action.subscribe((action: UserAction) => (emitedAction = action));
    component.update(component.user.id);
    expect(emitedAction).toEqual(expectedAction);
  });

  it("remove(id)  should emit an ACTION_USER_REMOVE", () => {
    let emitedAction: UserAction;
    let expectedAction: UserAction = new UserAction(ACTION_USER_REMOVE, {
      id: component.user.id
    });
    component.action.subscribe((action: UserAction) => (emitedAction = action));
    component.remove(component.user.id);
    expect(emitedAction).toEqual(expectedAction);
  });

  it("enable(id) should emit an ACTION_USER_REMOVE", () => {
    let emitedAction: UserAction;
    let expectedAction: UserAction = new UserAction(ACTION_USER_ENABLE, {
      id: component.user.id
    });
    component.action.subscribe((action: UserAction) => (emitedAction = action));
    component.enable(component.user.id);
    expect(emitedAction).toEqual(expectedAction);
  });

  it("toggleShowMore", () => {
    const expectedIsOpen = component.isOpen;
    component.toggleShowMore();
    expect(component.isOpen).not.toEqual(expectedIsOpen);
  });
});
