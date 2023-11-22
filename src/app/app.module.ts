import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/dashboard/sidebar/sidebar.component';
import { TopbarComponent } from './admin/dashboard/topbar/topbar.component';
import { ProductlistComponent } from './admin/dashboard/productlist/productlist.component';
import { AddproductComponent } from './admin/dashboard/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/dashboard/viewproduct/viewproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ForgetpasswordComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ProductlistComponent,
    AddproductComponent,
    ViewproductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
