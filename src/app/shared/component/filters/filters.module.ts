import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipeModule } from "src/app/shared/pipe/pipe.module";
import { CheckComumFilterComponent } from "./@comum/check-comum/check-comum-filter.component";
import { ComboComumFilterComponent } from "./@comum/combo-comum/combo-comum-filter.component";
import { ComboPesquisaFilterComponent } from "./@comum/combo-pesquisa/combo-pesquisa-filter.component";
import { DataIntervaloFilterComponent } from "./@comum/data-intervalo/data-intervalo-filter.component";
import { RadioComumFilterComponent } from "./@comum/radio-comum/radio-comum-filter.component";
import { TextoComumFilterComponent } from "./@comum/texto-comum/texto-comum-filter.component";
import { TextoIntervaloFilterComponent } from "./@comum/texto-intervalo/texto-intervalo-filter.component";
import { AcaoExecutoriaFilterComponent } from "./acao-executoria/acao-executoria-filter.component";
import { AcaoOriginariaFilterComponent } from "./acao-originaria/acao-originaria-filter.component";
import { AnoMesFilterComponent } from "./ano-mes/ano-mes-filter.component";
import { DataAutuacaoFilterComponent } from "./data-autuacao/data-autuacao-filter.component";
import { DocPessoaFilterComponent } from "./doc-pessoa/doc-pessoa-filter.component";
import { NumExpedienteFilterComponent } from "./num-expediente/num-expediente-filter.component";
import { NumProcessoFilterComponent } from "./num-processo/num-processo-filter.component";
import { NumRequisitorioFilterComponent } from "./num-requisitorio/num-requisitorio-filter.component";
import { OrdenacaoFilterComponent } from "./ordenacao/ordenacao-filter.component";
import { RegiaoFederalFilterComponent } from "./regiao-federal/regiao-federal-filter.component";
import { SecaoFilterComponent } from "./secao/secao-filter.component";
import { SeqClasseFilterComponent } from "./seq-classe/seq-classe-filter.component";
import { SistemaFilterComponent } from "./sistema/sistema-filter.component";
import { TipoProcessoFilterComponent } from "./tipo-processo/tipo-processo-filter.component";
import { UfFilterComponent } from "./uf/uf-filter.component";
import { VaraFilterComponent } from "./vara/vara-filter.component";


@NgModule({
    declarations:[
        TipoProcessoFilterComponent
        ,NumProcessoFilterComponent
        ,NumRequisitorioFilterComponent
        ,NumExpedienteFilterComponent
        ,SecaoFilterComponent
        ,DataAutuacaoFilterComponent
        ,CheckComumFilterComponent
        ,ComboComumFilterComponent
        ,TextoComumFilterComponent
        ,RadioComumFilterComponent
        ,DataIntervaloFilterComponent
        ,RegiaoFederalFilterComponent
        ,SistemaFilterComponent
        ,AnoMesFilterComponent   
        ,VaraFilterComponent 
        ,AcaoOriginariaFilterComponent   
        ,AcaoExecutoriaFilterComponent 
        ,SeqClasseFilterComponent   
        ,DocPessoaFilterComponent    
        ,OrdenacaoFilterComponent
        ,UfFilterComponent
        ,TextoIntervaloFilterComponent
        ,ComboPesquisaFilterComponent
    ]
    ,imports:[
        FormsModule
        ,CommonModule
        ,PipeModule
        ,ReactiveFormsModule
    ]
    ,providers:[

    ]
    ,exports:[
        TipoProcessoFilterComponent
        ,NumProcessoFilterComponent
        ,NumRequisitorioFilterComponent
        ,NumExpedienteFilterComponent
        ,SecaoFilterComponent
        ,DataAutuacaoFilterComponent
        ,CheckComumFilterComponent
        ,ComboComumFilterComponent
        ,TextoComumFilterComponent
        ,RadioComumFilterComponent
        ,DataIntervaloFilterComponent        
        ,RegiaoFederalFilterComponent
        ,SistemaFilterComponent   
        ,AnoMesFilterComponent  
        ,VaraFilterComponent  
        ,AcaoOriginariaFilterComponent   
        ,AcaoExecutoriaFilterComponent
        ,SeqClasseFilterComponent    
        ,DocPessoaFilterComponent   
        ,OrdenacaoFilterComponent
        ,UfFilterComponent
        ,TextoIntervaloFilterComponent
        ,ComboPesquisaFilterComponent
        
    ]    
})
export class FiltersModule{

}