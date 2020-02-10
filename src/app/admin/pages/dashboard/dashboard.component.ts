import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LIST_USERS_DOMAIN, LIST_USERS_ROUTE } from 'src/app/constants';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  public userForm: FormGroup;
  public iFrameURL: string =  LIST_USERS_DOMAIN + LIST_USERS_ROUTE;
  name: string;
  event: any;

  // toggle
  itemSelected = false;
  itemSelectedID = '';

  // modal
  modalActive = false;
  @ViewChild("listUsers", { static: true }) iFrame: ElementRef;
  constructor(private _fb: FormBuilder, private _viewContainerRef: ViewContainerRef) {
    // this.userForm = this.buildForm();
  }
  @HostListener("window:message", ["$event"])
  onMessage(event) {
    if(event.origin !== LIST_USERS_DOMAIN) return;
    const idUser : string = event.data;
    // console.log("event editar usuario: ", event, idUser);

  }
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

  AddUser() {
    event.preventDefault();
    // if(this.userForm.valid){
    // console.log(
    //   "user: ",
    //   this.userForm.value,
    //   this.iFrame.nativeElement.contentWindow.postMessage
    // );
    this.iFrame.nativeElement.contentWindow.postMessage(
      { name: "yuli desde otra ventana xD" },
      this.iFrameURL
    );
    // }
  }

  openModal() {
    this.modalActive = !this.modalActive;
  }
}
