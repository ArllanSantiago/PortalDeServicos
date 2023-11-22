import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FiltersModule } from "src/app/shared/component/filters/filters.module";
import { GridModule } from "src/app/shared/component/grid/grid.module";
import { NavModule } from "src/app/shared/component/nav/nav.model";
import { CniaComponent } from "./cnia/cnia.component";
import { CniaService } from "../../shared/services/cnia.service";
import { AtenasComponent } from "./atenas/atenas.component";
import { AtenasService } from "../../shared/services/atenas.service";
import { ProcessoComponent } from "./processo/processo.component";
import { ProcessoService } from "../../shared/services/processo.service";
import { RequisitorioComponent } from "./requisitorio/requisitorio.component";
import { CorrelacaoComponent } from "./correlacao/correlacao.component";
import { CorrelacaoService } from "../../shared/services/correlacaoService";
import { SgpComponent } from "./sgp/sgp.component";
import { SgpService } from "../../shared/services/sgp.service";
import { ExtratoDemoComponent } from "./extrato-demo/extrato-demo.component";
import { ExtratoDemoService } from "../../shared/services/extrato-demo.service";
import { ContaJuridicaComponent } from "./contas/conta-juridica/conta-juridica.component";

import { Interceptor } from "../auth/interceptor";


const routes: Routes = [
    {
        path: '', children: [
            { path: 'consulta-processo', component: ProcessoComponent, data: { state: 'consulta-processo' } }
            , { path: 'consulta-atenas', component: AtenasComponent, data: { state: 'consulta-atenas' } }
            , { path: 'consulta-requisitorio', component: RequisitorioComponent, data: { state: 'consulta-requisitorio' } }
            , { path: 'correlacao', component: CorrelacaoComponent, data: { state: 'correlacao' } }
            , { path: 'sgp', component: SgpComponent, data: { state: 'sgp' } }
            , { path: 'cnia', component: CniaComponent, data: { state: 'cnia' } }
            , { path: 'extrato-demo', component: ExtratoDemoComponent, data: { state: 'extrato-demo' } }
            , { path: 'conta-juridica', component: ContaJuridicaComponent, data: { state: 'conta-juridica' } }
            , {
                path: 'contas'
                , loadChildren: () => import('src/app/pages/delphos/contas/contas.module').then(m => m.ContasModule)
            }
            , {
                path: 'requisitorio'
                , loadChildren: () => import('src/app/pages/delphos/requisitorio/requisitorio.module').then(m => m.RequisitorioModule)
            }
        ]
    }
    , { path: '**', redirectTo: 'painel' }

]
@NgModule({
    declarations: [
        ProcessoComponent
        , AtenasComponent
        , RequisitorioComponent
        , CorrelacaoComponent
        , SgpComponent
        , CniaComponent
        , ExtratoDemoComponent
        , ContaJuridicaComponent
    ]
    , providers: [
        ProcessoService
        , AtenasService
        , CorrelacaoService
        , SgpService
        , CniaService
        , ExtratoDemoService
        , { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
    , imports: [
        RouterModule.forChild(routes)
        , ReactiveFormsModule
        , FiltersModule
        , GridModule
        , HttpClientModule
        , NavModule
    ]
})
export class DelphosModule { }