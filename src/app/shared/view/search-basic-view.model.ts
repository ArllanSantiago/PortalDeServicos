import { Breadcrumb } from "../component/breadcrumb/breadcrumb"
import { GridBasic } from "../component/grid/grid-basic/grid-basic"
import { Ordenacao } from "../component/filters/ordenacao/ordenacao"
import { ResponsePagination } from "../model/response-pagination.model"
export class SearchViewBasic {
    constructor(
        breadcrumbs: Breadcrumb[] = breadcrumbsBasic()
        ,opConsulta: {descricao:string, valor:string}[] = opConsultaBasic()
        ,lsOrdem: Ordenacao[] = []
        , grid: GridBasic = gridBasic()
        , dataRel: any[] = new Array<any>() )
        {
            this.title = 'Titulo da tela'
            this.subTitle= 'SubTitulo da tela'
            this.breadcrumbs = breadcrumbs
            this.opConsulta = opConsulta
            this.lsOrdem = lsOrdem
            this.grid = grid
            this.dataRel = dataRel
    }
    chkGroup: string = "0";
    title: string
    subTitle: string
    breadcrumbs: Breadcrumb[]
    opConsulta: {descricao:string, valor:string}[]
    lsOrdem: Ordenacao[]
    grid: GridBasic
    dataRel:any[]
}

function breadcrumbsBasic(): Breadcrumb[] {
    return  [
        { title: 'Painel', router: '/painelprc/painel' }
    ]
}

function opConsultaBasic():{descricao:string, valor:string}[]{
    return [
        { descricao: "Documento", valor: "0" }
        , { descricao: "Sequencial do RPV ou Precatório", valor: "1" }
        , { descricao: "Ação Originária", valor: "2" }
        , { descricao: "Número do Processo no ASC", valor: "3" }
        , { descricao: "Número do Requisitório no 1º Grau", valor: "4" }
        //, { descricao: "Vara", valor: "5" }
        , { descricao: "Ação Executória", valor: "6" }
    ]
}



function gridBasic():GridBasic{
    return {
        columns: [
            { headerName: 'Ação originária', field: 'acaoOriginaria', width: 130, sortable: true, resizable: true, filter: true },
            { headerName: 'Requisitório', field: 'numeroRequisitorio', width: 160, sortable: true, resizable: true, filter: true },
            { headerName: 'CPF / CNPJ', field: 'documento', width: 130, sortable: true, resizable: true, filter: true },
            { headerName: 'Sequêncial', field: 'sequencialDeClasseFormatado', width: 120, sortable: true, resizable: true, filter: true },
            { headerName: 'Beneficiário', field: 'beneficiario', width: 250, sortable: true, resizable: true, filter: true },
            { headerName: 'Vara', field: 'varaDescr', width: 250, sortable: true, resizable: true, filter: true },
            { headerName: 'Dt.Depósito', field: 'dataDeposito', width: 120, filter: true, resizable: true, sortable: true },
            { headerName: 'Banco', field: 'bancoDeDeposito', width: 100, sortable: true, resizable: true, filter: true },
            { headerName: 'Agência', field: 'agencia', width: 100, sortable: true, resizable: true, filter: true },
            { headerName: 'Conta', field: 'conta', width: 120, sortable: true, resizable: true, filter: true },
            { headerName: 'Valor (R$)', field: 'valorDepositoCurrency', width: 110, sortable: true, resizable: true, filter: true },

        ]
        , data: new ResponsePagination()
    }
}


