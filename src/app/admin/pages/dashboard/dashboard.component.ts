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
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public userForm: FormGroup;
  public iframeURL: string = LIST_USERS_DOMAIN + LIST_USERS_ROUTE;
  modalActive: boolean = false;
  users$: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      username: "yuli",
      password: "*68Hyt",
      fullname: "yuli teran",
      enabled: true,
      email: "cdc@jkasfhkjsf.com",
      address: "",
      id: "1"
    },
    {
      username: "Anaflavia",
      password: "*68Hcyt",
      fullname: "Anaflavia",
      enabled: true,
      email: "cdc@Anaflavia.com",
      address: "",
      id: "2"
    }
  ]);
  modals= {
    create: {
      title: "Crear Usuario",
      buttonText: "Crear",
    },
    update: {
      title: "Editar Usuario",
      buttonText: "Guardar",
    },
  };
  currentModal: { title: string , buttonText: string};
  @ViewChild("listUsers", { static: true }) iFrame: ElementRef;

  endPoint: any = '';

  constructor(
    private _fb: FormBuilder,
    private _viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    // this.notifyToList()
    // this.users$.subscribe(resp=>this.notifyToList()) 
    this.endPoint = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.endPoint}admin/list-users`)
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit", this.users$);

    // this.notifyToList();
  }
  @HostListener("window:message", ["$event"])
  onMessage(event) {
    if (event.origin !== LIST_USERS_DOMAIN) return;
    const action: UserAction = event.data;
    console.log("event action usuario: ", event, action, action.type === ACTION_USER_UPDATE);
    if (action.type === ACTION_USER_UPDATE) {
      console.log('OPEN MODAL EDIT');
      
      this.toggleShowModalUpdate();
    } else {
      this.handleUserAction(action);
    }
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
    console.log("notifyToList");

    // event.preventDefault();
    // if(this.userForm.valid){
    // console.log(
    //   "user: ",
    //   this.userForm.value,
    //   this.iFrame.nativeElement.contentWindow.postMessage
    // );
    console.log(this.iFrame, JSON.stringify(this.users$.value));
    this.iFrame.nativeElement.contentWindow.postMessage(
      JSON.stringify(this.users$.value),
      this.iframeURL
    );
    // }
  }

  toggleShowModalUpdate() {
    this.currentModal = this.modals.update;
    this.toggleShowModal();
  }

  toggleShowModal() {
    this.modalActive = !this.modalActive;
  }
  toggleShowModalCreate() {
    this.currentModal = this.modals.create;
    this.toggleShowModal();
  }
  crearUser() {
    console.log("CLICK: creeate user");
  }
  do(){
    
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
