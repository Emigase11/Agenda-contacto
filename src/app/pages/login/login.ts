import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginForm } from '../../interfaces/login';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink,FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  authService = inject(Auth);
  router = inject(Router)

loginModel = signal<LoginForm>({
  email: "",
  password: "",
});

formLogin = form(this.loginModel, (schemaPath) => {
  required(schemaPath.email);
  email(schemaPath.email);
  required(schemaPath.password);
  minLength(schemaPath.password,8)
});

async login(event: Event){
  event.preventDefault();

  const result = await this.authService.login(this.loginModel());
  if(result) {
    this.router.navigate(["/"]);
  } else {
    console.warn("ERROR")
  }


}


}
