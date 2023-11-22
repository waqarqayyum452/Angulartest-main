import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddproductComponent } from './admin/dashboard/addproduct/addproduct.component';
import { AuthGuard } from './auth.guard';
import { ViewproductComponent } from './admin/dashboard/viewproduct/viewproduct.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addproduct', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'add-product/:id', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'viewproduct', component:ViewproductComponent, canActivate: [AuthGuard]},
  { path: 'view-product/:id', component: ViewproductComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
