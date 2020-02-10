import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "create-users",
        component: DashboardComponent
      },
      
    ]
  },
  {
    path: "list-users",
        component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
