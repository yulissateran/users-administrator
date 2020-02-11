import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/clases/user';

xdescribe('ModalComponent', () => {
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

  it('BuildForm has to be called to create component', () => {
    component.setForm(component.user$)
    expect(component.form.value).toEqual(component.user$.value);
  });
  it('BuildForm has to be called to create component', () => {
    component.user$.next(null);
    component.setForm()
    expect(component.form.value).toEqual(new User());
  });
});
