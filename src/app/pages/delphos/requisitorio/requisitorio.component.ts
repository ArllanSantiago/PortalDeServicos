import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { RequisitorioView } from "../../../shared/view/requisitorio-view";
declare let $: any;

@Component({
    templateUrl: './requisitorio.component.html'
})
export class RequisitorioComponent {
    constructor() {
        this.formRequisitorio = new FormGroup(
            this.requisitorioView.controlsReq
        )
        this.formOficio = new FormGroup({
            ...this.requisitorioView.controlsOficio
            , numRequisitorio: this.requisitorioView.controlsReq['numRequisitorio']

        })
    }
    onClearControl() { 
        this.formOficio.reset()
        this.formRequisitorio.reset()
        this.requisitorioView.grid.data = new ResponsePagination()
    }
    onSearch() {
        const CONTROLS = this.formRequisitorio.valid ? this.formRequisitorio.controls : this.formOficio.controls
/*
        const FILTERS = Object.keys(CONTROLS).map(k => { return { k: CONTROLS[k].value } })

        // realiza a busca via API
        let response = this.consultaProcessoService.getProcesso(FILTERS)
        // tratar response 
        response = {
            ...response, content: response.content.map((item: ResponseConsultaProc) => {
                return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }

            })
        }

        //carrega a grid    
        this.consultaProcessoView.grid.data = response;
*/
    }
    onShowDetail(e: any) {
        //Abre o modal
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        const DETAIL: any[] = []
        //Carrega os dados do modal
        let resumoDetail: string[] = []

        // const detalhes = this.consultaProcessoService.getDetalheProcesso(e.rowData.numprocform)
        resumoDetail = [
            /* ...detalhes.partes.map(pt => {              
                 return  `Tipo Atuação:${pt.descrTipoParte}\n`
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
             })*/
        ]
        //Emite o objeto para exibir no modal
        /* this.movDetalheModalService.loadDetail.emit({
             resumo: resumoDetail
             , title: e.rowData.numproc
         });*/
    }
    requisitorioView: RequisitorioView = new RequisitorioView(this.onShowDetail)
    formRequisitorio: FormGroup
    formOficio: FormGroup
}