import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
// import { LayoutComponent } from "../layout/layout.component";

const routes: Routes = [
  // {
  //   path: "",
  //   component: LayoutComponent,
  //   children: [
      {
        path: "create-users",
        component: UserFormComponent
      },
      {
        path: "list-users",
        component: UserListComponent
      }
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
