import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  LIST_USERS_DOMAIN,
  LIST_USERS_ROUTE,
  ACTION_USER_UPDATE,
  ACTION_USER_ENABLE,
  ACTION_USER_REMOVE
} from "src/app/constants";
import { ModalComponent } from "src/app/admin/components/modal/modal.component";
import { UserAction } from "src/app/core/models/user-action";
import { User } from "src/app/core/models/user";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, AfterViewInit{

  public userForm: FormGroup;
  public iframeURL: string = LIST_USERS_DOMAIN + LIST_USERS_ROUTE;
  modalActive: boolean = false;
  users$: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      userName: "yuli",
      password: "*68Hyt",
      fullName: "yuli teran",
      enabled: true,
      email: "cdc@jkasfhkjsf.com",
      adress: "",
      id: '1'
    },
    {
      userName: "Anaflavia",
      password: "*68Hcyt",
      fullName: "Anaflavia",
      enabled: true,
      email: "cdc@Anaflavia.com",
      adress: "",
      id: '2'
    }
  ]);
  @ViewChild("listUsers", { static: true }) iFrame: ElementRef;
  constructor(
    private _fb: FormBuilder,
    private _viewContainerRef: ViewContainerRef
  ) {}
  ngOnInit(){
    // this.notifyToList()
    // this.users$.subscribe(resp=>this.notifyToList())
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit", this.users$);

    this.notifyToList()
  }
  @HostListener("window:message", ["$event"])
  onMessage(event) {
    if (event.origin !== LIST_USERS_DOMAIN) return;
    const action: UserAction = event.data;
    console.log("event action usuario: ", event, action);
    this.handleUserAction(action);
  }

  handleUserAction(action: UserAction) {
    let users = this.users$.value;
    switch (action.type) {
      case ACTION_USER_UPDATE:
        users = this.updateUser(users, action.payload);
        break;
      case ACTION_USER_REMOVE:
        users = this.removeUser(users, action.payload);
        break;
      case ACTION_USER_ENABLE:
        users = this.enableUser(users, action.payload);
        break;
      default:
        break;
    }
    this.users$.next(users);
  }

  enableUser(users, { id }) {
    return users.map(user => {
      if (user.id !== id) return user;
      return {
        ...user,
        enabled: !user.enabled
      };
    });
  }

  updateUser(users, { id, updatedUser }) {
    return users.map(user => {
      if (user.id !== id) return user;
      return updatedUser;
    });
  }
  removeUser(users, { id }) {
    return users.filter(user => user.id !== id);
  }

  notifyToList() {
    console.log('notifyToList');
  
    // event.preventDefault();
    // if(this.userForm.valid){
    // console.log(
    //   "user: ",
    //   this.userForm.value,
    //   this.iFrame.nativeElement.contentWindow.postMessage
    // );
    console.log(this.iFrame, JSON.stringify(this.users$.value))
    this.iFrame.nativeElement.contentWindow.postMessage(JSON.stringify(this.users$.value),
      this.iframeURL
    );
    // }
  }

  openModal() {
    this.modalActive = !this.modalActive;
  }
  crearUser() {
    console.log("CLICK: creeate user");
  }
}

// this.userForm = this.buildForm();

// buildForm(){
//   return this._fb.group({
//     userName: [null, Validators.required],
//     password: [
//       null,
//       Validators.compose([
//         Validators.required,
//         Validators.minLength(6),
//         passwordValidator
//       ])
//     ],
//     fullName: [
//       null,
//       Validators.compose([Validators.required, Validators.minLength(10)])
//     ],
//     enabled: [true, Validators.required],
//     email: null,
//     adress: null
//   });
// }
// userName:string;
// password: string,
// fullName: string,
// state: string;
// email?:string,
// adress?: string,
