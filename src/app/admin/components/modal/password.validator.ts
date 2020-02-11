import { AbstractControl, ValidationErrors } from "@angular/forms";

export const  passwordValidator = (control: AbstractControl): ValidationErrors =>{
  const password = control.value;
  if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/.test(password)) {
      return { 'passwordIsUnsafe': true };
  }
  return null;
}
