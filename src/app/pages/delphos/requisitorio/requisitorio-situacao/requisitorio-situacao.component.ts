import { Component, OnInit } from "@angular/core";
import { jsPDF } from "jspdf";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { Ordenacao } from "src/app/shared/component/filters/ordenacao/ordenacao";
import { TipoProcesso } from "src/app/shared/component/filters/tipo-processo/tipo-processo";
import { Uf } from "src/app/shared/component/filters/uf/uf";
import { Vara } from "src/app/shared/component/filters/vara/vara";
import { VaraService } from "src/app/shared/component/filters/vara/vara.service";
import { CpfCnpjPipe } from "src/app/shared/pipe/cpf-cnpj.pipe";
import { msgNotFound } from "src/app/shared/constants/app-const";
import { utils } from "src/app/shared/functions/utils";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import Swal from "sweetalert2";
import { getRequestSearch, RequisitorioSituacaoFilter, RequisitorioSituacaoView } from "../../../../shared/view/requisitorio-situacao-view";
import { RequisitorioSituacaoComponentInterface } from "./requisitorio-situacao.component.interface";
import { RequisitorioSituacaoService } from "../../../../shared/services/requisitorio-situacao.service";
import { pdf } from "src/app/shared/component/pdf/pdf";
import { ItemDetalhe, MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
declare let $: any
@Component({
  templateUrl: './requisitorio-situacao.component.html'
})
export class RequisitorioSituacaoComponent implements RequisitorioSituacaoComponentInterface, OnInit {
  constructor(
    private varaService: VaraService,
    private reqSitucaoService: RequisitorioSituacaoService,
    private movDetalheModalService: MovDetalheModalService) {

  }

  protected varasByDocum: Vara[] = new Array<Vara>();
  protected contentResponse: any[] = [];
  reqSituacaoView: RequisitorioSituacaoView = new RequisitorioSituacaoView(this.onDetailMov.bind(this));
  reqSituacaoFilter: RequisitorioSituacaoFilter = new RequisitorioSituacaoFilter()

  ngOnInit(): void {}
  onClear(){
    this.contentResponse = [];
    this.onLoadGridData(new ResponsePagination);  
    
    setTimeout(() => {
      this.reqSituacaoView.chkGroup = ''  
    }, 100);
     
    setTimeout(() => {
      this.reqSituacaoView.chkGroup = '0'  
    }, 100);

  }
  onSearch(urlParams: { page: number } = { page: 0 }): void {
    this.reqSituacaoFilter = {
      ...this.reqSituacaoFilter
      , dataIni: !!this.reqSituacaoFilter.dataIni ? this.reqSituacaoFilter.dataIni : null
      , dataFin: !!this.reqSituacaoFilter.dataFin ? this.reqSituacaoFilter.dataFin : null
    }
    const requestContas = getRequestSearch(this.reqSituacaoView.chkGroup, this.reqSituacaoView.controls)
    if (requestContas.valid) {
      requestContas.urlParams!.page = urlParams.page;
      utils.loading(
        this.reqSitucaoService.searchByCheck(requestContas, this.reqSituacaoView.chkGroup).then(res => {
          if (!!res) {
            this.contentResponse = this.onResponseMap(res);
            this.onSort(this.contentResponse);
            this.onLoadGridData(res);
            this.onLoadRelData();
          }
        })).then(() => {
          /*Gerando arquivo PDF*/
          this.reqSituacaoView.pdf = this.gerarText({
            data: this.reqSituacaoView.dataRel
            , nameRel: this.reqSituacaoView.title
          }, 'l')
          if (this.reqSituacaoView.grid.data.content.length  == 0){
            Swal.fire("Informação", msgNotFound, "info")
          }
        })
    } else {
      Swal.fire('Atenção!', requestContas.msg, "warning")
    }
  }
  /*Abre e carrega modal por linha*/
  onDetailMov(e:any):void {
    //Abre o modal
    var myModal = document.getElementById('myModal');
    $(myModal).modal('show');
    //Busca todos os dados que respondem ao requisitorio selecionado na grid
    const DETAIL = this.contentResponse.filter(res => res.numreq == e.rowData.numreq)
    //Carrega os dados do modal
    let resumoDetail: ItemDetalhe[] = []
    DETAIL.forEach(item => {
      const RESUMO_LINE = {
        mDataReceb: `\n ${item.dtreceb}`
        , mMovimento: `\n ${item.mov}`
        , mInfoBancarias: `\n Data Depósito: ${item.dataDeDeposito} Agência-Banco: ${item.agencia + " - " + item.conta} Valor Depositado: R$${item.valorDeDeposito}`
        , mBeneficiario: `\n Beneficiario: ${(item.documento ? new CpfCnpjPipe().transform(item.documento) + ' - ' : '') + item.beneficiario}`
        , mVara: `\n Vara: ${item.varaDescr} Local: ${item.municipio + ' - ' + item.uf}`
        , mSeparador: `\n ${String("*").repeat(100)}`
      }
     /* resumoDetail.push(
        RESUMO_LINE.mDataReceb
        + RESUMO_LINE.mMovimento
        + (item.dataDeDeposito ? RESUMO_LINE.mInfoBancarias : '')
        + RESUMO_LINE.mBeneficiario
        + RESUMO_LINE.mVara
        + RESUMO_LINE.mSeparador
      )*/
    })
  
    //Emite o objeto para exibir no modal
    this.movDetalheModalService.loadDetail.emit(new MovDetalheModel(e.rowData.numreq,resumoDetail));
  }
  /*Refinindo as Colunas da grid.*/
  onResponseMap(res: any): any[] {
    const VARAS = this.varasByDocum;
    return res.content.map(function (item:any) {
      const _vara = VARAS.find(v => v.codvara.toString() == item.vara && v.coduf == item.uf)
      return {
        ...item
        , varaDescr: _vara ? _vara.descr : 'não localizada'
        , numRequisitorio: item.numeroRequisitorio
        , dtreceb: !!item.dthrenvio?(new Date(item.dthrenvio)).toLocaleDateString('pt-BR'):""
        , indautuado: item.autuado == "S" ? "SIM" : "NÃO"
        , mov: item.mensagem
      }
    })
  }
  // Ordena por Numreq[CRESCENTE]/Data[DECRESCENTE]
  onSort(contentResponse:any[]): void {
    contentResponse.sort(function (nowItem, oldItem) {
      let dataOld: Date = new Date(oldItem.dthrinitransacao)
      let dataNow: Date = new Date(nowItem.dthrinitransacao)

      if (oldItem.numreq < nowItem.numreq) {
        return 1;
      } else
        if (oldItem.numreq > nowItem.numreq) {
          return -1;
        } else {
          if (dataOld.getTime() > dataNow.getTime()) {
            return 1;
          } else if (dataOld.getTime() < dataNow.getTime()) {
            return -1;
          }
          return 0;
        }
    })
  }
  /*Selecionado o ultimo movimento de cada requisitorio*/
  onResponseLast(): any[] {
    let contentLast:any[] = [];
    const REQS = [...new Set(this.contentResponse.map(item => item.numreq))]
    REQS.forEach(req => contentLast.push(this.contentResponse.filter(item => item.numreq == req)[0]))
    return contentLast
  }
  /*Montando obj para os relatorios(XLSX/PDF) */
  onLoadRelData(): void {
    this.reqSituacaoView.dataRel = this.onResponseLast().map(row => {
      return {
        "Requisitorio": row.numreq
        , "Recebimento": row.dtreceb
        , "Autuado": row.indautuado
        , "Movimentação": row.mov
      }
    })
  }
  /*Montando a Grid*/
  onLoadGridData(res: ResponsePagination): void {
    this.reqSituacaoView.grid = { ...this.reqSituacaoView.grid, data: { ...res, content: this.onResponseLast() } }
  }
  //Gerar o ARQUIVO PDF
  gerarText(builder: any, p_orientation:string): jsPDF {
    let doc = pdf.gerarPdf([], true, undefined, undefined, undefined, "l");
    let proxlinha = 45;
    let alginText: "left" | "center" | "right" | "justify" = 'left';
    let page = 1;

    const DATE_NOW = new Date().toLocaleDateString('pt-BR');
    const HOUR_NOW = new Date().toLocaleTimeString('pt-BR');
    const INI_PARAGRAF = 6;
    const DIF_BETWEEN_LINE = 4;
    const HEIGTH_PAGE = doc.internal.pageSize.height;
    const INI_FOOTER = HEIGTH_PAGE - 20;
    const FONT_SIZE_BODY = 12;
    /*Header*/
    doc.setFont("cambria", "bold", 16)
    doc.setFontSize(16)
    doc.text(builder.nameRel, 148, proxlinha += (DIF_BETWEEN_LINE * 2), { align: 'center' })
    doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
    doc.setFont("cambria", "normal", 12)
    doc.setFontSize(12)

    if (this.reqSituacaoFilter.documento) {
      doc.text(`CPF/CNPJ: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE * 2, { align: alginText })
      doc.text(`${this.reqSituacaoFilter.documento}`, 28, proxlinha, { align: alginText })
    }
    if (this.reqSituacaoFilter.dataIni) {
      doc.text(`Período de Dt. Deposito: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` de ${new Date(this.reqSituacaoFilter.dataIni + 'T00:00:00').toLocaleDateString("pt-BR")} até ${new Date(this.reqSituacaoFilter.dataFin + 'T00:00:00').toLocaleDateString("pt-BR")}`, 50, proxlinha, { align: alginText })
    }

    if (this.reqSituacaoFilter.numSeqIni) {
      doc.text(`Intervalo Sequencial: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` de ${this.reqSituacaoFilter.numSeqIni} até ${this.reqSituacaoFilter.numSeqFin}`, 44, proxlinha, { align: alginText })
    }
    if (this.reqSituacaoFilter.acaoOriginaria) {
      doc.text(`Ação Originária: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` ${this.reqSituacaoFilter.acaoOriginaria}`, 39, proxlinha, { align: alginText })
    }
    if (this.reqSituacaoFilter.numProcesso) {
      doc.text(`Número do Processo no TRF5: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` ${this.reqSituacaoFilter.numProcesso}`, 59, proxlinha, { align: alginText })
    }
    if (this.reqSituacaoFilter.numRequisitorio) {
      doc.text(`Número do Requisitório no 1ª Grau: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` ${this.reqSituacaoFilter.numRequisitorio}`, 69, proxlinha, { align: alginText })
    }
    if (this.reqSituacaoView.chkGroup == "5") {
      doc.text(`Vara: ${this.varasByDocum.find(v => v.codvara == this.reqSituacaoFilter.codVara)?.descr}`, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(`UF: ${this.reqSituacaoFilter.codUf}`, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
    }
    if (this.reqSituacaoFilter.acaoExecutoria) {
      doc.text(`Número da Ação Executória: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
      doc.text(` ${this.reqSituacaoFilter.acaoExecutoria}`, 69, proxlinha, { align: alginText })
    }
    doc.text(`Tipo de Processo: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
    doc.text(`${this.reqSituacaoFilter.codTipoProc == 388 ? "Precatório" : "RPV"}`, 38, proxlinha, { align: alginText })
    doc.text(`Ordenar por: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
    doc.text(`${this.reqSituacaoFilter.ordenacao}`, 29, proxlinha, { align: alginText })

    let configPdf : {

      dimensionsWField: number[]
    }
    let _INI_PARAGRAF = INI_PARAGRAF;
    builder.data.forEach((dLine:any) => {
      const DIF_HEADER = 10 // CONTROLA O ESPAÇO ENTRE AS COLUNAS POR IGUAL
      let field = Object.keys(dLine)

      if (builder.data.indexOf(dLine) == 0) {
        doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
        doc.setFont("cambria", "bold", 14)
        doc.setFontSize(14)
        _INI_PARAGRAF = INI_PARAGRAF
        configPdf.dimensionsWField.push(INI_PARAGRAF)
        configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[0]]).w))
        configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[1]]).w))
        configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[2]]).w))

        doc.text(field[0], configPdf.dimensionsWField[0], proxlinha += (DIF_BETWEEN_LINE * 1.5), { align: 'left' })
        doc.text(field[1], configPdf.dimensionsWField[1], proxlinha, { align: 'center' })
        doc.text(field[2], configPdf.dimensionsWField[2], proxlinha, { align: 'center' })
        doc.text(field[3], configPdf.dimensionsWField[3], proxlinha, { align: 'left' })

        doc.setFont("cambria", "normal", 12)
        doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
        doc.setFontSize(FONT_SIZE_BODY)
      }
      proxlinha += (DIF_BETWEEN_LINE * 2)
      //doc.getTextDimensions(dLine).y;
      //var splitText = doc.splitTextToSize(dLine, 185);      
      if (dLine) {
        //Adicionado Pag.
        if ((proxlinha + DIF_BETWEEN_LINE) >= INI_FOOTER) {
          doc.addPage()
          proxlinha = 30
          page++
          doc.setFont("cambria", "normal", 9)
          doc.setFontSize(9)
          doc.text(`Página:${page}`, p_orientation == 'l' ? 240 : 140, 15)
          doc.text(`Emitido em: ${DATE_NOW} ${HOUR_NOW}`, p_orientation == 'l' ? 240 : 140, 20);
          doc.setFontSize(FONT_SIZE_BODY)
        }
        _INI_PARAGRAF = INI_PARAGRAF
        doc.text(<string>dLine[field[0]], configPdf.dimensionsWField[0], proxlinha, { align: 'left' })
        doc.text(<string>dLine[field[1]], configPdf.dimensionsWField[1], proxlinha, { align: 'center' })
        doc.text(<string>dLine[field[2]], configPdf.dimensionsWField[2], proxlinha, { align: 'center' })
        doc.text(<string>dLine[field[3]], configPdf.dimensionsWField[3], proxlinha, { align: 'left' })
      }
    })
    let _INI_FOOTER = INI_FOOTER;
    doc.line(5, INI_FOOTER, 290, INI_FOOTER);
    doc.text(`Número de Requisitório: ${[... new Set(builder.data.map((d:any) => d.numreq))].length}`, 20, _INI_FOOTER += DIF_BETWEEN_LINE, { align: 'left' })

    return doc
  }

  displayNumproc(value: string): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, numProcesso: value }
  }
  displayDocumento(value: string): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, documento: value }
    if (!!value) {
      this.varaService.buscarVaraPorDocumento(value).then(res => { this.varasByDocum = res?res:[] })
    }
  }
  displayIntevalorSeq(value: number[]): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, numSeqIni: value[0] }
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, numSeqFin: value[1] }
  }
  displayIntevalorMov(value: Date[]): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, dataIni: value[0] }
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, dataFin: value[1] }
  }
  displayTipoProc(value: TipoProcesso): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, codTipoProc: value.codtipo }
  }
  displayOrdenacao(value: Ordenacao): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, ordenacao: value.valor }
  }
  displayAcaoOriginaria(value: string): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, acaoOriginaria: value }
  }
  displayAcaoExecutoria(value: string): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, acaoExecutoria: value }
  }
  displayRequisitorio(value: string): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, numRequisitorio: value }
  }
  displayUf(value: Uf): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, codUf: value.coduf }
  }
  displayVara(value: Vara): void {
    this.reqSituacaoFilter = { ...this.reqSituacaoFilter, codVara: value.codvara }
  }
}