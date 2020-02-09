import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard";
import { LOGIN_ROUTE, LIST_USERS_ROUTE } from "./constants";
import { LayoutComponent } from "./admin/pages/layout/layout.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([LOGIN_ROUTE]);
const redirectLoggedInToAdmin = () => redirectLoggedInTo([LIST_USERS_ROUTE]);

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToAdmin },
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "admin",
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
