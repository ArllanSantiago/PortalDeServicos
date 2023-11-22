import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/shared/animation/router-animation';
import Swal from 'sweetalert2';
import { SYSDATA } from '../../../shared/constants/app-const'
import { LoginService } from './login.service';
@Component({
  templateUrl: './login.component.html'
  , animations: [
    routerTransition
  ]
})
export class LoginComponent{
  constructor(
    private router: Router
    , private loginService: LoginService
  ) { }

  btnSignIn :{disable:boolean,title: 'Entrar' | 'Aguarde...'} = {disable:false, title:'Entrar'}
  SYSTEM_DATA = SYSDATA
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', { initialValueIsDefault: true, validators: [Validators.required] })
    , password: new FormControl('', { initialValueIsDefault: true, validators: [Validators.required] })
    , newpassword: new FormControl('')
    , session: new FormControl(this.SYSTEM_DATA.Sessions[0], { initialValueIsDefault: true, validators: [Validators.required] })
  });

  firstAccess() {
    return null;
  }
  contact() {
    return null;
  }
  signIn() {
     localStorage.setItem("user-token",'')
     this.btnSignIn ={disable:true,title:'Aguarde...'}

     this.loginService.doSignIn({
       "login": this.loginForm.controls['login'].value,
       "secao": this.loginForm.controls['session'].value.id,
       "senha": this.loginForm.controls['password'].value
     }).subscribe({
       next:(user)=>{
         localStorage.setItem("user-name",user.login)
         localStorage.setItem("user-token",user.token)
         this.router.navigate(['/painel'],).then(()=>{window.location.reload()})
       }
       ,error:(err:any)=>{Swal.fire('Atenção','Usuário e Senha Inválidos','warning'),this.btnSignIn ={disable:false,title:'Entrar'}}
       
     })
  }
}
