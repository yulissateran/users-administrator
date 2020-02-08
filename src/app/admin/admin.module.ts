import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
