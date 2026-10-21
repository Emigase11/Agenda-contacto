import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterForm } from '../../interfaces/register';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  authService = inject(Auth);

  router = inject(Router)

registerModel = signal<RegisterForm>({
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: ""
});

formRegister = form(this.registerModel, (schemaPath) => {
  required(schemaPath.email);
  required(schemaPath.firstName);
  required(schemaPath.lastName);
  email(schemaPath.email);
  required(schemaPath.password);
  minLength(schemaPath.password,8)
  validate(schemaPath.password2, ({value})=> {
    if(value() === this.registerModel().password) return  null;
    return {kind: "passwordMatch",message: 'El password debe debe ser igual al original'}
  })
});

async register(event: Event){
  event.preventDefault();
  console.log(this.registerModel())
  const result = await this.authService.register(this.registerModel());
  if(result) {
    this.router.navigate(["/login"]);
  } else {
    console.warn("ERROR")
  }
}


}
