import { User } from "./models/user";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { UserMock } from "./user-mock";
import { ErrorAuth } from "src/app/core/clases/error-auth";

export class AngularFireAuthMock {
  public authState: BehaviorSubject<User | null>;
  constructor() {
    this.authState = new BehaviorSubject(null);
  }

  public auth = {
    // createUserWithEmailAndPassword:(email,password)=>{
    //   return new Promise((reject,resolve)=>{
    //   if(passwordValidator.length > 6 ){
    //     reject()
    //   }
    //   })
    // },

    signInWithEmailAndPassword: (email, password) => {
      return new Promise((resolve, reject) => {
        if (email !== "yulissa.lteran@gmail.com" || password !== "YulissaT*@") {
          reject({
            code: "auth/wrong-password",
            message:
              "The password is invalid or the user does not have a password."
          });
        } else {
          const currentUser = UserMock;
          this.authState.next(currentUser);
          resolve(currentUser);
        }
      });
    },

    signOut: () => new Promise((resolve, reject) => resolve(undefined))
  };
}
