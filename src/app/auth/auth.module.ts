import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

const route : Routes = [
  {
    path : 'sign-in' , component: SignUpComponent
  },
  {
    path : 'login' , component: LoginComponent
  }
]
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(route),
    MatIconModule
  ]
})
export class AuthModule { }
