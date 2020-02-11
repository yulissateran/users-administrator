export class ErrorAuth {
  code: string;
  message: string;
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
