import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartModule } from "src/app/shared/component/charts/chart.module";
import { DashInfoComponent } from "./dash-info.component";
import { InfoAutuacaoComponent } from "./info-autuacao/info-autuacao.component";


const routes: Routes = [
    { path: '', component: DashInfoComponent }
    , { path: '**', redirectTo: 'painel' }
]
    

@NgModule({
    declarations: [
        DashInfoComponent
        ,InfoAutuacaoComponent
    ]
    ,imports:[
        RouterModule.forChild(routes)
        ,ChartModule  
        ,CommonModule        
    ]
})
export class DashInfoModule{}