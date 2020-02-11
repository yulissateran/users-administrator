import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { passwordValidator } from "src/app/admin/components/modal/password.validator";
import { User } from "src/app/core/clases/user";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() user: BehaviorSubject<any>;
  @Output() close: EventEmitter<null> = new EventEmitter(null);
  form: FormGroup;
  sentForm: boolean = false;
  @Output() customSubmit: EventEmitter<User> = new EventEmitter();
  constructor(private _fb: FormBuilder) {
    this.form = this.buildForm();
  }

  buildForm() {
    return this._fb.group({
      username: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          passwordValidator
        ])
      ],
      fullname: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      enabled: [true, Validators.required],
      email: null,
      address: null
    });
  }

  ngOnInit() {
    this.user.subscribe(user => {
      if (user) {
        this.form.patchValue(user);
      } else {
        this.form.reset();
        this.form.patchValue(new User());
      }
    });
  }

  validateSubmit() {
    this.sentForm = true;
    if (this.form.valid)
      this.customSubmit.emit({ ...this.form.value, id: Date.now() });
  }
}
