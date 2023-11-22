import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { utils } from "src/app/shared/functions/utils";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import Swal from "sweetalert2";
import { ProcessoView } from "../../../shared/view/processo.view"
import { ProcessoService, SeachrByProcess } from "../../../shared/services/processo.service";
declare let $: any;
@Component({
    templateUrl: './processo.component.html'
})
export class ProcessoComponent {
    processoView: ProcessoView = new ProcessoView(this.onShowDetail.bind(this))
    formProcesso: FormGroup
    constructor(private movDetalheModalService: MovDetalheModalService, private processoService: ProcessoService) {
        this.formProcesso = new FormGroup(this.processoView.controls)

    }
    //Identificar o tabpanel ativo do momento
    tabCurrent(): SeachrByProcess {
        const TABS: { [key: string]: SeachrByProcess } = {
            'tab-processo': 'numProcesso'
            , 'tab-name-parte': 'NomeParte'
            , 'tab-num-oab': 'Oab'
            , 'tab-doc-parte': 'DocParte'
        }
        return TABS[document.getElementsByClassName('show active')[0].id];
    }
    //pipeCpfCnpjPipe


    handlerResponse() {

    }
    onSearch() {
        let response: ResponsePagination = new ResponsePagination();
        // Buscar Processo        
        utils.loading(
            new Promise((resolve, reject) => {
                this.processoService.searchBy(this.tabCurrent(), this.formProcesso.controls)
                    .subscribe({
                        next: (res) => {
                            if (res) {
                                // tratar response 
                                const processos =
                                    this.tabCurrent() === "numProcesso" ? res.content.map((item: any) => item.processos[0]) : res.content
                                response.content = processos.map((proc: any) => {
                                    return {
                                        ...proc
                                        , numprocform: proc.numeroProcesso
                                        , descrTipoProc: proc.classeProcesso ? `${proc.classeProcesso.codtipproc}-${proc.classeProcesso.descrEsparta || proc.classeProcesso.descricao}` : proc.codtipproc
                                        , secao: this.formProcesso.controls['secao'].value
                                    }
                                })
                            }
                        }
                        , error: (err: any) => {
                            console.log('errr')
                            reject(err)
                        }
                        , complete: () => {
                            this.processoView.grid = { ...this.processoView.grid, data: response }
                            resolve(true)
                        }
                    })
            })
        ).then((popup) => {
            if (popup.isConfirmed) {
                if (this.processoView.grid.data.content.length == 0) {
                    Swal.fire("Informação", utils.msg.notFound, "info")
                }
            }
        })
    }

    onClearControl() {
        this.formProcesso.reset()
        this.processoView.grid.data = new ResponsePagination()
    }
    tabOnClick() {
        this.onClearControl()
    }


    onShowDetail(e: any) {
        let movDetalhe: MovDetalheModel = new MovDetalheModel(
            e.rowData.numprocform
            , []
        )
        utils.loading(
            new Promise((resolve, reject) => {
                //Busca todos os dados que correspondem ao requisitorio selecionado na grid
                this.processoService.getDetalheProcesso(e.rowData.numprocform, e.rowData.secao)
                    .subscribe({
                        next: ((res: any) => {
                            const content = res.content[0]
                            movDetalhe.resumo = Object.entries({
                                'Classe': content.processos[0].codtipproc
                                , 'Assunto CJF': (<any[]>content.processos[0].assunto).length > 0 ? content.processos[0].assunto[0] : undefined
                                , 'Número do Processo': content.numeroProcesso
                                , 'Localidade Atual': content.situacaoAtual[0].descUltimaLocalizacao
                                , 'Data de Protocolo': content.processos[0].dtentr ? new Date(content.processos[0].dtentr + 'T00:00:00') : undefined
                                , 'Data de Autuação': content.processos[0].DataAjuizamento
                                , 'Data de Distribuição': content.situacaoAtual[0].dthrultmovdistr ? new Date(content.situacaoAtual[0].dthrultmovdistr + 'T00:00:00') : undefined
                                , 'Magistrado Relator': content.situacaoAtual[0].nomeultrelator
                            }).map(([objKey, objValue]) => {
                                return { key: objKey, value: objValue }
                            })

                            movDetalhe.partes = content.partes.map((parte: any) => {
                                return Object.entries({
                                    'Tipo Atuação': parte.tipoParte.descr
                                    , 'OAB': parte.dadosPessoa.numeroOAB
                                    , 'CPF/CNPJ': parte.dadosPessoa.documentos[0].numdocpess
                                    , 'Nome da Parte': parte.dadosPessoa.nome
                                    , 'Personalidade': parte.dadosPessoa.tipopessoa
                                }).map(([objKey, objValue]) => {
                                    return { key: objKey, value: objValue }
                                })
                            })
                            this.processoService.getDetalheMovimento(e.rowData.numprocform, e.rowData.secao).subscribe({
                                next: ((res: any) => {
                                    movDetalhe.movimentos = res.content.map((mov: any) => {
                                        return Object.entries({
                                            'Data da Movimentação': mov.dthrmov
                                            , 'Fase': `${mov.codfase} - ${mov.fasedescr}`
                                            , 'Observação': mov.obs

                                        }).map(([objKey, objValue]) => {
                                            return { key: objKey, value: objValue }
                                        })
                                    })
                                    movDetalhe.resumo.push({ key: 'Vara de Origem', value: res.content[0].varaDeOrigem });
                                })
                                , error: (err: any) => { console.log('errDetalheMovimento', err) }
                            })


                        })
                        , complete: () => {
                            console.log('ssss', movDetalhe)
                            //Abre o modal
                            var myModal = document.getElementById('myModal');
                            $(myModal).modal('show');
                            //Emite o objeto para exibir no modal
                            resolve(this.movDetalheModalService.loadDetail.emit(movDetalhe));
                        }
                        , error: (err: any) => { reject(err) }
                    })
            })
        )
    }

    onDownPdf() {
    }
    onDownXlsx() {
    }

}