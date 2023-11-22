import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Interceptor } from "./interceptor";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";

const routes : Routes = [
    {path:'', component: LoginComponent}
    ,{path:'login', component: LoginComponent}
    ,{path:'**', redirectTo: 'login'}
]
@NgModule({
    declarations:[
        LoginComponent
    ]
    ,imports:[
        RouterModule.forChild(routes)
        ,CommonModule
        ,ReactiveFormsModule
        ,HttpClientModule
    ]
    ,providers:[
        LoginService
        ,{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
    ,exports:[
        RouterModule    
    ]
})
export class AuthModule{}