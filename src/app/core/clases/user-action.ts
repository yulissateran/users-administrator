export class UserAction {
  type:string;
  payload:any;
  constructor(type, payload){
    this.type = type;
    this.payload = payload;

  }
}