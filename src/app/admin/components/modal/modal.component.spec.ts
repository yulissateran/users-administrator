import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/clases/user';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    const user$ = { ...new User(), id: Date.now() }
    component.user$ = new BehaviorSubject(user$)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('BuildForm has to be called to create component', () => {
    component.buildForm = jasmine.createSpy();
    const spy = component.buildForm as jasmine.Spy;
    spy.calls.reset();
    expect(spy.calls.count()).toBe(1);
  });

  // setForm(user$): Subscription {
  //   return this.user$.subscribe(user$ => {
  //     if (user$) {
  //       this.form.patchValue(user$);
  //     } else {
  //       this.form.reset();
  //       this.form.patchValue(new User());
  //     }
  //   });
  // }
  it('BuildForm has to be called to create component', () => {
    component.form.patchValue = jasmine.createSpy();
    component.form.reset = jasmine.createSpy();
    // const user = {...new User(), id: Date.now()};
    component.setForm(component.user$)
    // component.buildForm = jasmine.createSpy();
    const spy = component.form.patchValue as jasmine.Spy;
    // spy.calls.reset();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.count()).toHaveBeenCalledWith(component.user$.value);
  });
});
