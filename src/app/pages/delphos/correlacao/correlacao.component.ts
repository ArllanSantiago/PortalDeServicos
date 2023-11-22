import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { CorrelacaoView } from "../../../shared/view/correlacao-view";
import { CorrelacaoService } from "../../../shared/services/correlacaoService";
import { MessageService } from "src/app/shared/services/message.service";
import { Correlcao } from "src/app/shared/model/correlacao";
declare let $: any

@Component({
    templateUrl: './correlacao.component.html'
})
export class CorrelacaoComponent {
    constructor(
        private correlacaoService: CorrelacaoService,
        private messageService: MessageService,
    ) {
        this.correlacaoView = new CorrelacaoView(this.onShowDetail.bind(this))
        this.formCorr = new FormGroup(this.correlacaoView.controls)
    }

    correlacao: Correlcao = {
        codigo: '',
        descricao: ''
    }


    formCorr: FormGroup
    correlacaoView: CorrelacaoView
    onShowDetail(e: any) {
        //Abre o modal
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        const DETAIL: any[] = []
        //Carrega os dados do modal
        let resumoDetail: string[] = []
        /*
                const detalhes = this.consultaProcessoService.getDetalheProcesso(e.rowData.numprocform)
                resumoDetail = [
                    ...detalhes.partes.map(pt => {              
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
                    })
                ]
                //Emite o objeto para exibir no modal
                this.movDetalheModalService.loadDetail.emit({
                    resumo: resumoDetail
                    , title: e.rowData.numproc
                });*/
    }
    onSearch() {
        
        if(this.validarCampos() == true){
        this.messageService.enviarMensagemAlerta("Verifique os campos obrigatórios");
        }else{
            this.messageService.enviarMensagemSucessoParam("Busca validada");
        }

        const CONTROLS = this.formCorr.controls
        const FILTERS = Object.keys(CONTROLS).map(k => { return { k: CONTROLS[k].value } })

        // realiza a busca via API
        let response = this.correlacaoService.getProcesso(FILTERS)
        // tratar response 
        /*     response = {
                 ...response, content: response.content.map((item: ResponseConsultaProc) => {
                     return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }
     
                 })
             }
     */
        //carrega a grid    
        this.correlacaoView.grid.data = response;

    }

    onClearControl() {
        this.formCorr.reset()
        this.correlacaoView.grid.data = new ResponsePagination()
    }

    onAssunto(): void {
        this.messageService.enviarMensagemAlerta(" Para o filtro código é possível informar tanto no formato CNJ (10122) quanto CJF (01.11.01) ou apenas clique em CONSULTAR.");
    }
    onClasse(): void {
        this.messageService.enviarMensagemAlerta("Listagem de classes pertencentes apenas a Justiça Federal da Segunda Instância.");

    }
    onMovimento(): void {
        this.messageService.enviarMensagemAlerta("Listagem de MOVIMENTOS da Justiça Federal da Segunda Instância, equivale as Fases do Esparta.");
    }

    validarCampos(): boolean {
        if(!this.correlacaoView.controls['codCnjCjf'].value){
            return true
        }else if(!this.correlacaoView.controls['descrCnj'].value){
            return true
        }
        return false
        
    }
}