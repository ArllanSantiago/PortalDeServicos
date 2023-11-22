import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FiltersModule } from "src/app/shared/component/filters/filters.module";
import { GridModule } from "src/app/shared/component/grid/grid.module";
import { NavModule } from "src/app/shared/component/nav/nav.model";
import { Interceptor } from "../auth/interceptor";
import { RelatorioGenericoComponent } from "./relatorio-generico/relatorio-generico.component";

const routes: Routes = [
    {
        path: '', children: [
            {
                path:'relatorio-generico', component: RelatorioGenericoComponent, data: { state: 'relatorio-generico'}
            }
        ]
    }, { path: '**', redirectTo: 'painel' }
]

@NgModule({
    declarations: [
        RelatorioGenericoComponent
    ]
    ,providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
    ,imports: [        
        RouterModule.forChild(routes)
        , ReactiveFormsModule
        , FiltersModule
        , GridModule
        , HttpClientModule
        , NavModule
    ]
})
export class PrecatorioModule {}