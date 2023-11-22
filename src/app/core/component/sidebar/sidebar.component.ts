import { Component } from "@angular/core"

@Component({
    selector: 'app-sidebar'
    , templateUrl: './sidebar.component.html'
    , styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    public USER ={name: localStorage.getItem("user-name")||'ASC-USER'}
    protected SERVICOS:{[key:string]:string} = {
        'delphos':'/painel/servicos/delphos'
    }

    protected PRECATORIO:{[key:string]:string} = {
        'precatorio':'/painel/servicos/precatorio'
    }

    public MENU: Menu[] = [
        {
            id: 'mnDelphos'
            , title: 'Delphos'
            , icon: "nav-icon fas fa-archive"
            , count: 12
            , subMenu: [
                { id: 'mnCorreicao', title: 'Correlação', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/correlacao`}
                ,{ id: 'mnRequisitorio', title: 'Requisitório', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/consulta-requisitorio`}
                , { id: 'mnSgp', title: 'SGP', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/sgp`}
                , { id: 'mnProcesso', title: 'Processos', icon: 'fa fa-file nav-icon', count: 1, router: `${this.SERVICOS['delphos']}/consulta-processo`}
                , { id: 'mnCnia', title: 'CNIA', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/cnia`}
                , { id: 'mnAtenas', title: 'Atenas', icon: 'fa fa-file nav-icon', count: 1, router: `${this.SERVICOS['delphos']}/consulta-atenas`}
                , { id: 'mnExtrato', title: 'Extrato', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/extrato-demo`}
                , { id: 'mnContasJuridica', title: 'Contas Jurídicas', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/conta-juridica`}
                , { id: 'mnContaVinc', title: 'Contas Vinculadas', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/contas/vinculadas`}
                , { id: 'mnContaLev', title: 'Contas Levantadas', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/contas/levantadas`}
                , { id: 'mnContaCanc', title: 'Contas Canceladas', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/contas/canceladas`}
                , { id: 'mnContaNLev', title: 'Contas Não Levantadas', icon: 'fa fa-file nav-icon', count: 0, router: `${this.SERVICOS['delphos']}/contas/nao-levantadas`}
            ]
        }
    ]
    public MENU_PRECATORIO: Menu[] = [
        {
            id: 'mnPrecatorio'
            , title: 'Precatorio'
            , icon: "nav-icon fas fa-archive"
            , count: 1
            , subMenu: [
                { id: 'mnRelatorioGenerico', title: 'Relatório Genérico', icon: 'fa fa-file nav-icon', count: 0, router: `${this.PRECATORIO['precatorio']}/relatorio-generico`}
            ]
        }
    ]
}

type Menu = {
    id: string
    title: string
    icon: string
    count: number
    router?: string
    click?: CallableFunction
    subMenu?: Menu[]

}

