import { Component, OnInit } from '@angular/core';
import { Ordenacao } from 'src/app/shared/component/filters/ordenacao/ordenacao';
import { TipoProcesso } from 'src/app/shared/component/filters/tipo-processo/tipo-processo';
import { Uf } from 'src/app/shared/component/filters/uf/uf';
import { Vara } from 'src/app/shared/component/filters/vara/vara';
import { VaraService } from 'src/app/shared/component/filters/vara/vara.service';
import { msgNotFound } from 'src/app/shared/constants/app-const';
import { utils } from 'src/app/shared/functions/utils';
import { ResponsePagination } from 'src/app/shared/model/response-pagination.model';
import Swal from 'sweetalert2';
import { getRequestSearch, RequisitorioOficioFilter, RequisitorioOficioView } from '../../../../shared/view/requisitorio-oficio-view';
import { RequisitorioOficioComponentInterface } from './requisitorio-oficio.component.interface';
import { RequisitorioOficioService } from '../../../../shared/services/requisitorio-oficio.service';

declare let $: any

@Component({
  templateUrl: './requisitorio-oficio.component.html'
})
export class RequisitorioOficioComponent implements RequisitorioOficioComponentInterface, OnInit {

  reqOficioView: RequisitorioOficioView = new RequisitorioOficioView(this.onDetailMov.bind(this));
  _reqOficioFilter: RequisitorioOficioFilter = new RequisitorioOficioFilter()
  set reqOficioFilter(value: RequisitorioOficioFilter) {
    this._reqOficioFilter = value;
  }
  get reqOficioFilter(): RequisitorioOficioFilter {
    return this._reqOficioFilter;
  }

  constructor(   
    private varaService: VaraService,
    private reqOficioService: RequisitorioOficioService
  ) { }

  displayNumproc(value: string): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, numProcesso: value }
  }
  displayDocumento(value: string): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, documento: value }
    if (!!value) {
      this.varaService.buscarVaraPorDocumento(value).then(res => this.varasByDocum = res?res: new Array<Vara>())
    }
  }
  displayIntevalorSeq(value: number[]): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, numSeqIni: value[0] }
    this.reqOficioFilter = { ...this.reqOficioFilter, numSeqFin: value[1] }
  }
  displayIntevalorMov(value: Date[]): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, dataIni: value[0] }
    this.reqOficioFilter = { ...this.reqOficioFilter, dataFin: value[1] }
  }
  displayTipoProc(value: TipoProcesso): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, codTipoProc: value.codtipo }
  }

  displayOrdenacao(value: Ordenacao): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, ordenacao: value.valor }
  }
  displayAcaoOriginaria(value: string): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, acaoOriginaria: value }
  }
  displayAcaoExecutoria(value: string): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, acaoExecutoria: value }
  }
  displayRequisitorio(value: string): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, numRequisitorio: value }
  }
  displayUf(value: Uf): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, codUf: value.coduf }
  }
  displayVara(value: Vara): void {
    this.reqOficioFilter = { ...this.reqOficioFilter, codVara: value.codvara }
  }

  chkGroup: string = '';

  public varasByDocum: Vara[] = new Array<Vara>();
  onClear() {
    this.reqOficioView.grid = { ...this.reqOficioView.grid, data: new ResponsePagination() }

    setTimeout(() => {
      this.reqOficioView.chkGroup = ''
    }, 100);

    setTimeout(() => {
      this.reqOficioView.chkGroup = '0'
    }, 100);

  }
  onSearch(urlParams: { page: number } = { page: 0 }): void {
    this.reqOficioFilter = {
      ...this.reqOficioFilter
      , dataIni: !!this.reqOficioFilter.dataIni ? this.reqOficioFilter.dataIni : null
      , dataFin: !!this.reqOficioFilter.dataFin ? this.reqOficioFilter.dataFin : null
    }
    const requestContas = getRequestSearch(this.reqOficioView.chkGroup, this.reqOficioView.controls)
    if (requestContas.valid) {
      requestContas.urlParams!.page = urlParams.page
      utils.loading(
        this.reqOficioService.searchByCheck(requestContas, this.reqOficioView.chkGroup).then(res => {
          if (!!res) {
            if (res.content.length == 0) {
              Swal.fire("Informação", msgNotFound, "info")
            } else {

              /*Refinindo as Colunas da grid.*/
              let _content: any[] = res.content.map(function (item: any) {
                return {
                  ...item, numreq: !item.numreq ? item.numeroRequisitorio : item.numreq
                  , dataDeMovimento: (new Date(item.dataDeMovimento)).toLocaleDateString('pt-BR')
                }
              })
              /*Carregando a Grid*/
              this.reqOficioView.grid = { ...this.reqOficioView.grid, data: { ...res, content: _content } }
            }
          }
        })).then(() => {
          if (this.reqOficioView.grid.data.content.length == 0) {
            Swal.fire("Atenção", msgNotFound, 'info')
          }
        })
    } else {
      Swal.fire('Atenção!', requestContas.msg, "warning")
    }
  }

  onDetailMov(e:any) {
    let requestObj = getRequestSearch('4', this.reqOficioView.controls )

    this.reqOficioService.downloadOficio(requestObj).then(res => {
      try {
        const url = window.URL.createObjectURL(res.body);
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
          link.setAttribute('href', url);
          link.setAttribute('download', `${e.rowData.numreq}.pdf`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
      catch (e) {
        Swal.fire('Erro', 'Não foi possível realizado o download.', 'error')
      }
    })
  }

  ngOnInit() {}
}
