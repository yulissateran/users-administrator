import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AdminRoutingModule } from "./admin-routing,module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ModalComponent } from './components/modal/modal.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    UserListComponent,
    LayoutComponent,
    DashboardComponent,
    ModalComponent,
    UserCardComponent
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, SharedModule]
})
export class AdminModule {}
