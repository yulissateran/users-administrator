import { AbstractControl, ValidationErrors } from "@angular/forms";

export const  passwordValidator = (control: AbstractControl): ValidationErrors =>{
  const password = control.value;
  if (password && !/^(?=.*[a-zA-Z])(?=.*\W).*$/.test(password)) {
      return { 'passwordIsUnsafe': true };
  }
  return null;
}
