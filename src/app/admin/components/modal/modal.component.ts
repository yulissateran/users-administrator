import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordValidator } from 'src/app/core/validators/password.validator';
import { User } from 'src/app/core/models/user';

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<null> = new EventEmitter(null);
  form: FormGroup;
  sentForm: boolean = false;
  @Output() customSubmit: EventEmitter<User> = new EventEmitter()
  @Input() buttonText: string = 'button';
  constructor(private _fb: FormBuilder) {
    this.form = this.buildForm();
    console.log(this.form);
  }

  buildForm() {
    return this._fb.group({
      userName: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          passwordValidator
        ])
      ],
      fullName: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      enabled: [true, Validators.required],
      email: null,
      adress: null
    });
  }
  // userName:string;
  // password: string,
  // fullName: string,
  // state: string;
  // email?:string,
  // adress?: string,
  ngOnInit() {
  }

  validateSubmit() {
    console.log(this.form);
    this.sentForm = true;
    if (this.form.valid) this.customSubmit.emit(this.form.value);
  }
}
