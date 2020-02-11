export class User {
  username: string;
  password: string;
  fullname: string;
  address?: string;
  enabled: boolean;
  email?: string;
  id: number;
  constructor() {
    this.username = "";
    this.password = "";
    this.fullname = "";
    this.address = "";
    this.email = "";
    this.enabled = true;
  }
}
