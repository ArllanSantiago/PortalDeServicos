import { Component } from "@angular/core";
import { ContasVinculadasService } from "../../../../shared/services/contas-vinculadas.service";
import { getRequestContas } from "../../../../shared/view/contas-view";
import { ContasComponent } from "../contas.component";
import Swal from "sweetalert2";
import { utils } from "src/app/shared/functions/utils";
import { jsPDF } from "jspdf";
import { CpfCnpjPipe } from "src/app/shared/pipe/cpf-cnpj.pipe";
import { msgNotFound } from "src/app/shared/constants/app-const";
import { pdf } from "src/app/shared/component/pdf/pdf";

@Component({
    templateUrl: '../contas.component.html'
})
export class ContasVinculadasComponent extends ContasComponent {
    constructor(private contasVincService: ContasVinculadasService
    ) {
        super();
        this.contasView.title = "Contas Vinculadas";
        this.contasView.subTitle = "Consulta as Contas Vinculadas";
        this.contasView.breadcrumbs = [this.contasView.breadcrumbs[0], {title:this.contasView.title}]
    }
    override onSearch(urlParams: { page: number } = { page: 0 }): void {
        let requestContas = getRequestContas(this.contasView.chkGroup, this.contasView.controls)
        if (requestContas.valid) {
            requestContas.urlParams!.page = urlParams.page;
            utils.loading(
                this.contasVincService.searchByCheck(requestContas, this.contasView.chkGroup).then(res => {
                    if (!!res) {
                        /*Refinar as Colunas. Alguams propriedades vinheram fora do p*/
                        let _content = res.content.map(function (item: any) {
                            return {
                                ...item,
                                dataDeposito: new Date(item.dataDeDeposito).toLocaleDateString('pt-BR')
                                , varaDescr: `VaraDescr`
                                , valorDepositoCurrency: utils.formatterCurrency.format(utils.correctCurrency(item.valorDeposito))
                            }
                        })
                        this.contasView.grid = { ...this.contasView.grid, data: { ...res, content: _content } }

                        /*Montando obj para os relatorios atraves das Colunas da Grid */
                        this.contasView.dataRel = _content.map((row: any) => {
                            return {
                                "Vara": row.varaDescr
                                , "Ação Originária": row.acaoOriginaria
                                , "CPF/CNPJ": (new CpfCnpjPipe()).transform(row.documento)
                                , "Sequencial": row.sequencialDeClasseFormatado
                                , "Dt. Depósito": row.dataDeposito
                                , "Banco-Agência-Conta":`${row.bancoDeDeposito}-${row.agencia}-${row.conta}`
                                , "Valor": row.valorDeposito
                                , "Requisitório":row.numeroRequisitorio
                                , "Beneficiário":row.beneficiario
                            }
                        })
                    }
                })
            ).then(() => {
                if (this.contasView.dataRel?.length == 0) {
                    Swal.fire("Informação", msgNotFound, "info")
                  }
                this.contasView.pdf = this.gerarText({
                    data: this.contasView.dataRel
                    , nameRel: this.contasView.title
                }, 'l')
            })
        } else {
            Swal.fire('Atenção!', requestContas.msg, "warning")
        }
    }
    gerarText(builder: any, p_orientation:string): jsPDF {
        let doc = pdf.gerarPdf([], true, undefined, "", undefined, "l");
        let proxlinha = 45;
        let alginText: "left" | "center" | "right" | "justify" = 'left';
        let page = 1;

        const DATE_NOW = new Date().toLocaleDateString('pt-BR');
        const HOUR_NOW = new Date().toLocaleTimeString('pt-BR');
        const INI_PARAGRAF = 6;
        const DIF_BETWEEN_LINE = 4;
        const HEIGTH_PAGE = doc.internal.pageSize.height;
        const INI_FOOTER = HEIGTH_PAGE - 20;
        const FONT_SIZE_BODY= 12

        /*Header*/
        doc.setFont("cambria", "bold", 16)
        doc.setFontSize(16)
        doc.text(builder.nameRel, 148, proxlinha += (DIF_BETWEEN_LINE * 2), { align: 'center' })
        doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
        doc.setFont("cambria", "normal", 12)
        doc.setFontSize(12)

        if (this.contasView.controls['documento'].value) {
            doc.text(`CPF/CNPJ: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE * 2, { align: alginText })
            doc.text(`${this.contasView.controls['documento']}`, 28, proxlinha, { align: alginText })
        }
        if (this.contasView.controls['dataIni'].value) {
            doc.text(`Período de Dt. Depósito: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` de ${new Date(this.contasView.controls['dataIni'] + 'T00:00:00').toLocaleDateString("pt-BR")} até ${new Date(this.contasView.controls['dataFin'] + 'T00:00:00').toLocaleDateString("pt-BR")}`, 50, proxlinha, { align: alginText })
        }
        if (this.contasView.controls['numSeqIni'].value) {
            doc.text(`Intervalo Sequencial: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` de ${this.contasView.controls['numSeqIni']} até ${this.contasView.controls['numSeqFin']}`, 44, proxlinha, { align: alginText })
        }
        if (this.contasView.controls['acaoOriginaria'].value) {
            doc.text(`Ação Originária: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` ${this.contasView.controls['acaoOriginaria']}`, 39, proxlinha, { align: alginText })
        }
        if (this.contasView.controls['numProcesso'].value) {
            doc.text(`Número do Processo no ASC: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` ${this.contasView.controls['numProcesso']}`, 59, proxlinha, { align: alginText })
        }
        if (this.contasView.controls['numRequisitorio'].value) {
            doc.text(`Número do Requisitório no 1ª Grau: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` ${this.contasView.controls['numRequisitorio']}`, 69, proxlinha, { align: alginText })
        }
        if (this.contasView.chkGroup == "5") {
            doc.text(`Vara: ${this.contasView.controls['codVara'].value}`, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(`UF: ${this.contasView.controls['codUf']}`, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
        }
        if (this.contasView.controls['acaoExecutoria'].value) {
            doc.text(`Número da Ação Executória: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
            doc.text(` ${this.contasView.controls['acaoExecutoria'].value}`, 69, proxlinha, { align: alginText })
        }
        doc.text(`Tipo de Processo: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
        doc.text(`${this.contasView.controls['codTipoProc'].value == 388 ? "Precatório" : "RPV"}`, 38, proxlinha, { align: alginText })
        doc.text(`Ordenar por: `, INI_PARAGRAF, proxlinha += DIF_BETWEEN_LINE, { align: alginText })
        doc.text(`${this.contasView.controls['ordenacao']}`, 29, proxlinha, { align: alginText })

        let configPdf : {
            dimensionsWField: number[],
        }

        let _INI_PARAGRAF = INI_PARAGRAF;
        builder.data.forEach((dLine: any) => {
            const DIF_HEADER = 10 // CONTROLA O ESPAÇO ENTRE AS COLUNAS POR IGUAL
            let field = Object.keys(dLine)
            if (builder.data.indexOf(dLine) == 0) {
                doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
                doc.setFont("cambria", "bold", 14)
                doc.setFontSize(14)
                _INI_PARAGRAF = INI_PARAGRAF

                /*definindo a dimenssao das colunas*/

                configPdf.dimensionsWField.push(_INI_PARAGRAF)
                configPdf.dimensionsWField.push(_INI_PARAGRAF)
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[1]]).w))
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[2]]).w))
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[3]]).w))
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[4]]).w))
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[5]]).w))
                //
                _INI_PARAGRAF = INI_PARAGRAF
                configPdf.dimensionsWField.push(_INI_PARAGRAF)
                configPdf.dimensionsWField.push(_INI_PARAGRAF += DIF_HEADER + Math.round(doc.getTextDimensions(dLine[field[7]]).w))

                // cabeçalho
                doc.text(field[0], configPdf.dimensionsWField[0], proxlinha += (DIF_BETWEEN_LINE * 1.5), { align: 'left' })

                doc.text(field[1], configPdf.dimensionsWField[1], proxlinha += (DIF_BETWEEN_LINE * 1.5), { align: 'left' })
                doc.text(field[2], configPdf.dimensionsWField[2], proxlinha, { align: 'center' })
                doc.text(field[3], configPdf.dimensionsWField[3], proxlinha, { align: 'left' })
                doc.text(field[4], configPdf.dimensionsWField[4], proxlinha, { align: 'left' })
                doc.text(field[5], configPdf.dimensionsWField[5], proxlinha, { align: 'left' })
                doc.text(field[6], configPdf.dimensionsWField[6], proxlinha, { align: 'center' })

                doc.text(field[7], configPdf.dimensionsWField[7], proxlinha += (DIF_BETWEEN_LINE * 1.5), { align: 'left' })
                doc.text(field[8], configPdf.dimensionsWField[8], proxlinha, { align: 'left' })


                doc.setFont("cambria", "normal", 12)
                doc.line(5, proxlinha += DIF_BETWEEN_LINE, 290, proxlinha)
                doc.setFontSize(FONT_SIZE_BODY);
            }
            proxlinha += (DIF_BETWEEN_LINE * 2)
            //doc.getTextDimensions(dLine).y;
            //var splitText = doc.splitTextToSize(dLine, 185);
            if (dLine) {
                //Adicionado Pag.

                if ((proxlinha + (DIF_BETWEEN_LINE*4)) >= INI_FOOTER) {
                    //doc.addPage()
                    doc.addPage()
                    proxlinha = 30
                    doc.setFont("cambria", "normal", 9)
                    doc.setFontSize(9)
                    page++
                    doc.text(`Página:${page}`, p_orientation == 'l' ? 240 : 140, 15)
                    doc.text(`Emitido em: ${DATE_NOW} ${HOUR_NOW}`, p_orientation == 'l' ? 240 : 140, 20);
                    doc.setFontSize(FONT_SIZE_BODY)
                }
                //Dados
                doc.text(String(dLine[field[0]]), configPdf.dimensionsWField[0], proxlinha, { align: 'left' })

                doc.text(String(dLine[field[1]]), configPdf.dimensionsWField[1], proxlinha+= (DIF_BETWEEN_LINE * 2), { align: 'left' })
                doc.text(String(dLine[field[2]]), configPdf.dimensionsWField[2], proxlinha, { align: 'center' })
                doc.text(String(dLine[field[3]]), configPdf.dimensionsWField[3], proxlinha, { align: 'left' })
                doc.text(String(dLine[field[4]]), configPdf.dimensionsWField[4], proxlinha, { align: 'left' })
                doc.text(String(dLine[field[5]]), configPdf.dimensionsWField[5], proxlinha, { align: 'left' })
                doc.text(String(dLine[field[6]]), configPdf.dimensionsWField[6], proxlinha, { align: 'center' })


                doc.text(String(dLine[field[7]]), configPdf.dimensionsWField[7], proxlinha+= (DIF_BETWEEN_LINE * 2), { align: 'left' })
                doc.text(String(dLine[field[8]]), configPdf.dimensionsWField[8], proxlinha, { align: 'left' })

            }
        })
        let _INI_FOOTER = INI_FOOTER;
        doc.line(5, INI_FOOTER, 290, INI_FOOTER);
        doc.text(`Número de Processo: ${[... new Set(builder.data.map((d:any) => d.Sequencial))].sort().length}`, 20, _INI_FOOTER += DIF_BETWEEN_LINE, { align: 'left' })
         doc.text(`Número de Beneficiários: ${builder.data.length}`, 120, _INI_FOOTER, { align: 'left' })
         doc.text(`Valor Total: ${builder.data.length > 0 ?
           utils.formatterCurrency.format(builder.data.map((d:any) =>  utils.correctCurrency(d.Valor)).reduce((a:any, b:any) => a + b, 0))
           : 0}`, 220, _INI_FOOTER, { align: 'left' })
        return doc
    }

}
