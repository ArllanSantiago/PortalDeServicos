import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BreadCrumbModule } from "src/app/shared/component/breadcrumb/breadcrumb.module";
import { GridModule } from "src/app/shared/component/grid/grid.module";
import { FiltersModule } from "src/app/shared/component/filters/filters.module";
import { VaraService } from "src/app/shared/component/filters/vara/vara.service";
import { PdfModule } from "src/app/shared/component/pdf/pdf.module";
import { XlsxModule } from "src/app/shared/component/xlsx/xlsx.module";
import { ContasCanceladasComponent } from "./contas-canceladas/contas-canceladas.component";
import { ContasVinculadasComponent } from "./contas-vinculadas/contas-vinculadas.component";
import { ContasVinculadasService } from "../../../shared/services/contas-vinculadas.service";
import { ContasLevantadasComponent } from "./contas-levantadas/contas-levantadas.component";
import { ContasCanceladasService } from "../../../shared/services/contas-canceladas.service";
import { ContasComponent } from "./contas.component";
import { Interceptor } from "../../auth/interceptor";

const routes: Routes = [
    { path: "vinculadas", component: ContasVinculadasComponent }
    , { path: "canceladas", component: ContasCanceladasComponent }
    , { path: "levantadas", component: ContasLevantadasComponent }

]
@NgModule({
    declarations: [
        ContasVinculadasComponent
        , ContasCanceladasComponent
        , ContasLevantadasComponent
        , ContasComponent

    ]
    , imports: [
        HttpClientModule
        , RouterModule.forChild(routes)
        , FiltersModule
        , CommonModule
        , ReactiveFormsModule
        , FormsModule
        , GridModule
        , BreadCrumbModule
        , XlsxModule
        , PdfModule

    ]
    , providers: [
        ContasVinculadasService
        , ContasCanceladasService
        , VaraService
        , { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
    , exports: [
        ContasVinculadasComponent
        , ContasCanceladasComponent
        , ContasLevantadasComponent
    ]
})
export class ContasModule { }