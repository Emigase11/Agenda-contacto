import { inject, Service } from '@angular/core';
import { LoginForm } from '../interfaces/login';
import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/register';

@Service()
export class Auth {
token = localStorage.getItem("token") || "";
router = inject(Router);

async login(loginData: LoginForm):Promise<boolean>{
const res = await fetch("http://localhost:5000/api/authentication/authenticate",{
    method: "POST",
    headers: {
        "content-type" : "application/json"
    },
    body : JSON.stringify({
        email: loginData.email,
        password: loginData.password
    })
  })
  if (!res.ok) return false;
  const token = await res.text()
  localStorage.setItem("token",token)
  this.token = token; 
  return true;

}

logout(){
  this.token = "";
  localStorage.clear();
  this.router.navigate(["/login"])
}

async register(registerData: RegisterForm):Promise<boolean>{
const res = await fetch("http://localhost:5000/api/users",{
    method: "POST",
    headers: {
        "content-type" : "application/json"
    },
    body : JSON.stringify({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName
    })
  })
  return res.ok
}

}
