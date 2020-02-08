import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
public userForm: FormGroup;
  constructor(private _fb : FormBuilder) { 
    this.userForm = this._fb.group({
      userName: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          passwordValidator
        ])
      ],
      fullName:[null,  Validators.compose([Validators.required, Validators.minLength(10)])],
      enable: [true, Validators.required],
      email: null,
      adress: null,

    });
  }
      // userName:string;
      // password: string,
      // fullName: string,
      // state: string;
      // email?:string,
      // adress?: string,

  AddUser(){
    event.preventDefault();
    if(this.userForm.valid){
      console.log('user: ', this.userForm.value);
      
    }
  }
  ngOnInit() {
  }

}
