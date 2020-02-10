import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
form:FormGroup;
constructor(private  _fb:FormBuilder){
this.form = this.buildForm();
}
buildForm(){
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

}
