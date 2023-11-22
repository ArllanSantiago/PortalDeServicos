import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/error/not-found/not-found.component';


const routes: Routes = [  
  {path:"painel", loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)}
  ,{path:"auth", loadChildren:()=> import('src/app/pages/auth/auth.module').then(m=>m.AuthModule)}     
  ,{ path: '', redirectTo: 'auth', pathMatch: 'full' }
  ,{ path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)    
  ]
  ,exports: [RouterModule]
})
export class AppRoutingModule { }

