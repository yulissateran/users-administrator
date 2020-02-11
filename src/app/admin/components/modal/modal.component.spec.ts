import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/clases/user';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
    let spyPatchValue :jasmine.Spy;
   let spyReset :jasmine.Spy;
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
    component.user$ = new BehaviorSubject(user$);
    component.form.patchValue = jasmine.createSpy() as jasmine.Spy;
    component.form.reset = jasmine.createSpy()as jasmine.Spy;
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
    // component.form.patchValue = jasmine.createSpy();
    // component.form.reset = jasmine.createSpy();
    component.setForm(component.user$)

    expect(spyPatchValue.calls.count()).toBe(1);
    expect(spyReset.calls.count()).toBe(0);
    expect(spyPatchValue.calls.count()).toHaveBeenCalledWith(component.user$.value);
  });
  it('BuildForm has to be called to create component', () => {
    component.form.patchValue = jasmine.createSpy();
    component.form.reset = jasmine.createSpy();
    component.setForm(null)
    const spy = component.form.patchValue as jasmine.Spy;
    const spyReset = component.form.reset as jasmine.Spy;
    expect(spy.calls.count()).toBe(1);
    expect(spyReset.calls.count()).toBe(1);
    expect(spy.calls.count()).toHaveBeenCalledWith(new User());
  });
});
