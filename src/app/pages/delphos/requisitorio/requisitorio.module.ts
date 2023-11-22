import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BreadCrumbModule } from "src/app/shared/component/breadcrumb/breadcrumb.module";
import { GridModule } from "src/app/shared/component/grid/grid.module";
import { FiltersModule } from "src/app/shared/component/filters/filters.module";
import { PdfModule } from "src/app/shared/component/pdf/pdf.module";
import { XlsxModule } from "src/app/shared/component/xlsx/xlsx.module";
import { PipeModule } from "src/app/shared/pipe/pipe.module";
import { RequisitorioSituacaoComponent } from "./requisitorio-situacao/requisitorio-situacao.component";
import { RequisitorioSituacaoService } from "../../../shared/services/requisitorio-situacao.service";
import { RequisitorioOficioComponent } from './requisitorio-oficio/requisitorio-oficio.component';
import { RequisitorioOficioService } from "../../../shared/services/requisitorio-oficio.service";

const routes: Routes = [
    { path: "situacao", component:RequisitorioSituacaoComponent}
    ,{ path: "oficio", component:RequisitorioOficioComponent } 
]
@NgModule({
    declarations:[
        RequisitorioSituacaoComponent,
        RequisitorioOficioComponent
    ]
    ,imports:[
        HttpClientModule
        ,RouterModule.forChild(routes)        
        ,FiltersModule 
        ,CommonModule  
        ,FormsModule 
        ,GridModule
        ,BreadCrumbModule
        ,XlsxModule
        ,PdfModule
        ,PipeModule
    ]
    ,providers:[
        RequisitorioSituacaoService,
        RequisitorioOficioService       
    ]
    ,exports:[RequisitorioSituacaoComponent]
})
export class RequisitorioModule{}