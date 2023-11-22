import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { ExtratoDemoView } from "../../../shared/view/extrato-demo-view"
import { ExtratoDemoService, ResponseConsultaProc } from "../../../shared/services/extrato-demo.service";
declare let $: any

@Component({
    templateUrl: './extrato-demo.component.html'
})
export class ExtratoDemoComponent {
    constructor(private movDetalheModalService: MovDetalheModalService, private extratoService: ExtratoDemoService) {
        this.formParte = new FormGroup({
            tipoReq: this.extratoView.controls['tipoReq']
            , numOab: this.extratoView.controls['numOab']
            , numDocPess: this.extratoView.controls['numDocPess']
            , dataAutuacaoIni: this.extratoView.controls['dataAutuacaoIni']
            , dataAutuacaoFin: this.extratoView.controls['dataAutuacaoFin']
            , dataDepositoIni: this.extratoView.controls['dataAutuacaoIni']
            , dataDepositoFin: this.extratoView.controls['dataAutuacaoFin']
        })

        this.formEspecifico = new FormGroup({
            tipoReq: this.extratoView.controls['tipoReq']
            , numProcesso: this.extratoView.controls['numProcesso']
            , acaoOrig: this.extratoView.controls['acaoOrig']
            , numRequisitorio: this.extratoView.controls['numRequisitorio']
        })
    }
    extratoView: ExtratoDemoView = new ExtratoDemoView(this.onShowDetail.bind(this))
    formParte!: FormGroup
    formEspecifico!: FormGroup

    onSearch() {
        const CONTROLS = this.formParte.valid ? this.formParte.controls : this.formEspecifico.controls
        const FILTERS = Object.keys(CONTROLS).map(k => { return { k: CONTROLS[k].value } })

        // realiza a busca via API
        let response = this.extratoService.getProcesso(FILTERS)
        // tratar response 
        response = {
            ...response, content: response.content.map((item: ResponseConsultaProc) => {
                return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }

            })
        }

        //carrega a grid    
        this.extratoView.grid.data = response;

    }

    onClearControl() {
        this.formParte.reset()
        this.formEspecifico.reset()
        this.extratoView.grid.data = new ResponsePagination()
    }

    onShowDetail(e: any) {
        //Abre o modal
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        const DETAIL: any[] = []
        //Carrega os dados do modal
        let resumoDetail: string[] = []

        const detalhes = this.extratoService.getDetalheProcesso(e.rowData.numprocform)
        resumoDetail = [
            ...detalhes.partes.map(pt => {
                return `Tipo Atuação:${pt.descrTipoParte}\n`
                    + `OAB:${pt.oab}\n`
                    + `CPF/CNPJ:${pt.numdocpess}\n`
                    + `Nome da Parte:${pt.nomeparte}\n`
                    + `Personalidade:${pt.personalidade}\n`
                    + `Característica:${pt.caracteristica}\n`
            })

            , ...detalhes.movimentos.map(mov => {
                return `Data do Movimento:${mov.datamov}\n`
                    + `Fase/Descrição:${mov.codfase + '-' + mov.descfase}\n`
                    + `Complemento 1:${mov.complemento1}\n`
                    + `Complemento 2:${mov.complemento2}\n`
                    + `Observação:${mov.observacao}\n`
            })
        ]
        //Emite o objeto para exibir no modal
        this.movDetalheModalService.loadDetail.emit(new MovDetalheModel(e.rowData.numproc, []));
    }

    onDownPdf() {
    }
    onDownXlsx() {
    }

}