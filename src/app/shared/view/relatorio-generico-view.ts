import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "../component/grid/grid-basic/grid-basic";
import { HeaderGridRelatorioGenerico } from "../enum/header-grid-relatorio-generico.enum";
import { ResponsePagination } from "../model/response-pagination.model";

export class RelatorioGenericoView {
    constructor(private showDetail: (e: any) => void) {

    }

    controls: { [key: string]: FormControl } = {
        classeProcessual: new FormControl('0', { initialValueIsDefault: true, updateOn: 'change', validators: [] })
        , numProcesso: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , dataIni: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , dataFin: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , intervaloIni: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , intervaloFin: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , tipoDespesa: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , naturezaDespesa: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , naturezaProcessual: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , naturezaCredito: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , entidadeFederal: new FormControl(true, { initialValueIsDefault: true, updateOn: 'change' })
        , entidadeEstadual: new FormControl(true, { initialValueIsDefault: true, updateOn: 'change' })
        , entidadeMunicipal: new FormControl(true, { initialValueIsDefault: true, updateOn: 'change' })
        , individualizado: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , unidadeGestora: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , instituicaoBancaria: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change'})
        , situacaoAtual: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , lotePagamento: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , cpfCnpj: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , assuntoCnj: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , assuntoCjf: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , entidadeDevedora: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , unidadeExecutada: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        //Local de Origem
        , uf: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , cidade: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , justicaOriginaria: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , vara: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        //Processos que possuem
        , tramitacaoAtiva: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , alvara: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , pagamentoSuplementar: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , parcelaSuperpreferencial: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , conferidoPagamento: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , parcelamentoEspecial: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , sobrestamento: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , valorCompensar: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , restricaoPagamento: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , reembolsoSecaoJudiciaria: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , processoReincluidos: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , valorAtualizado: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , espolio: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , incapaz: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , idoso: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , doencaGrave: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , deficienciaFisica: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        //Fase Externa
        , faseExterna: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , complemento1Externa: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , complemento2Externa: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , dataIniMovimentacaoExterna: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , dataFinMovimentacaoExterna: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , naoExisteFaseExterna: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , ultimaFaseExterna: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        //Fase Interna
        , tipo: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , faseInterna: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , complemento1Interna: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , complemento2Interna: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change' })
        , dataIniMovimentacaoInterna: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , dataFinMovimentacaoInterna: new FormControl('', { initialValueIsDefault: true, updateOn: 'change'})
        , naoExisteFaseInterna: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        , ultimaFaseInterna: new FormControl(true, { initialValueIsDefault:true ,updateOn: 'change' })
        
    }
    gridExterna: GridBasic = {
        columns: [
             { headerName: HeaderGridRelatorioGenerico.tipo, field: 'tipo', resizable: true, sortable: true, width: 50, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.fase, field: "fase", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.complemento1, field: "complemento1", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.complemento2, field: "complemento2", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.dataInicial, field: "dataInicial", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.dataFinal, field: "dataFinal", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.naoExiste, field: 'naoExiste', resizable: true, sortable: true, width: 50, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.ultimaFase, field: 'ultimaFase', resizable: true, sortable: true, width: 50, filter: true }
            , { headerName: HeaderGridRelatorioGenerico.acoes, field: 'acoes', resizable: true, sortable: true, width: 50, filter: true }
        ]
        ,
         data: new ResponsePagination()
    }

}