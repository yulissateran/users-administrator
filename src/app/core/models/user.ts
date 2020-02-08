export interface User {
  userName:string;
  password: string,
  fullName: string,
  enabled: boolean;
  email?:string,
  adress?: string,
  id?: string; 
}
export interface UserForm {
  userName:string;
  password: string,
  fullName: string,
  enabled: boolean;
  email?:string,
  adress?: string,
}