import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
