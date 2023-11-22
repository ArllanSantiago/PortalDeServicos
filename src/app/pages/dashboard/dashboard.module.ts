import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentModule } from "src/app/core/component/component.module";
import { SettingService } from "src/app/core/component/setting/setting.service";
import { TimeLineModule } from "src/app/shared/component/time-line/time-line.module";
import { DashPersonalComponent } from "./dash-personal/dash-personal.component";

import { DashboardComponent } from "./dashboard.componet";


export const MAIN_ROUTES: Routes =[
    {  path: 'servicos',component:DashboardComponent
        ,children:[
            {path:'info', loadChildren:()=> import('src/app/pages/dashboard/dash-info/dash-info.module').then(m => m.DashInfoModule)}
            ,{path:'delphos',loadChildren:()=> import('src/app/pages/delphos/delphos.module').then(m => m.DelphosModule)}       
            ,{path:'precatorio',loadChildren:()=> import('src/app/pages/precatorio/precatorio.module').then(m => m.PrecatorioModule)}            
            ,{path:'personal', component: DashPersonalComponent}
        ]
    }      
    ,{path:'', redirectTo:'servicos/info', pathMatch: 'full'}          
    ,{ path: '**', redirectTo: 'servicos/info' }
]
@NgModule({
    declarations:[
        DashboardComponent
        ,DashPersonalComponent
    ]
    ,imports:[         
        RouterModule.forChild(MAIN_ROUTES)  
        ,ComponentModule  
        ,CommonModule        
        ,TimeLineModule
    ]     
    ,providers:[
        SettingService
    ]  
})
export class DashboardModule{}
