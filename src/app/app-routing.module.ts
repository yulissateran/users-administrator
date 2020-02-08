import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard";

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/login"]);
const redirectLoggedInToAdmin = () => redirectLoggedInTo(["/admin"]);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

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
