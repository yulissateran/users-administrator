import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing,module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
