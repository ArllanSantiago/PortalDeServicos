import jsPDF, { TextOptionsLight } from "jspdf";
import { IRelatorioPersonalizado } from "../../model/relatorio.interface";

export class pdf{
    public static gerarPdf(p_texto: string[], usarCabPadrao: boolean, p_titulo?: string, p_secao?: string
        , relPerson?: IRelatorioPersonalizado, p_orientation?: string): jsPDF {
        //var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: p_orientation /*pagesplit: true*/ });
        const doc: jsPDF = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: 'a4',
          putOnlyUsedFonts: true
        });
    
    
        var proxlinha = 15
        var page = 1
        var dNow = new Date();
        var hNow = (new Date).toLocaleString().substr(11, 5)
        var localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() /* + ' ' + dNow.getHours() + ':' + dNow.getMinutes() */;
        doc.setFont("cambria", "normal", 9)
        doc.setFontSize(9)
        doc.text(`Página:${page}`, p_orientation == 'l' ? 240 : 140, 15)
        doc.text(`Emitido em: ${localdate} ${hNow}`, p_orientation == 'l' ? 240 : 140, 20);
    
        if (usarCabPadrao == true) {
          var img = new Image();
          img.src = "assets/img/trf5banner.jpeg";
          doc.addImage(img, 'PNG', 4, 1, 70, 30);
          doc.setFont("cambria", "bold", 14)
          doc.setFontSize(14)
          proxlinha = 30
          doc.text("Poder Judiciario", 13, proxlinha)
          doc.text(`Justiça Federal - 5ª Região ${p_secao? p_secao : ''}`, 13, proxlinha + 5)
          proxlinha = 60
          doc.setFontSize(18)
          if (p_titulo) {
            doc.text(`${p_titulo}`, 100, proxlinha, { align: 'center' });
            doc.line(5, 60, 200, 60);
            proxlinha = 70
          }
        }
    
        var espEntreLinha = 4
        var pageHeight = doc.internal.pageSize.height;
        var textOptions: TextOptionsLight;
        var iniParagraf = 6;
        var fontsizeBody = 10;
        doc.setFontSize(fontsizeBody);


        p_texto.forEach(linha => {
          //cabeçalho e RodaPé
          if ((p_texto.indexOf(linha) >= relPerson!.iniCabPerson!
            && p_texto.indexOf(linha) < relPerson!.fimCadPerson!) ||
            p_texto.indexOf(linha) == relPerson!.fimCadPerson ||
    
            (p_texto.indexOf(linha) >= relPerson!.iniRodaPePerson!
              && p_texto.indexOf(linha) < relPerson!.fimRodaPePerson!) ||
            p_texto.indexOf(linha) == relPerson!.fimRodaPePerson
          ) {
            textOptions.align = relPerson!.textOptions!.align
          } else {
            textOptions.align = "left"
          }
    
          //Inicio do Paragrafo      
          if (textOptions.align == 'center') {
            iniParagraf = 100
          } else {
            iniParagraf = 6
          }
          doc.getTextDimensions(linha).w;
          var splitText = doc.splitTextToSize(linha, 185);
          if (linha.length > 0) {
            splitText.forEach((sublinha:string)=> {
              doc.text(sublinha, iniParagraf, proxlinha, textOptions );
              proxlinha += espEntreLinha
              if (proxlinha >= pageHeight - 10) {
                doc.addPage()
                proxlinha = 15
                page++
                doc.setFont("cambria", "normal", 9)
                doc.text(`Página:${page}`, 150, 15)
                doc.text(`Emitido em: ${localdate} ${hNow}`, 150, 19);
                doc.setFontSize(fontsizeBody)
              }
            })
          } else {
            proxlinha += espEntreLinha
          }
        })
        return doc
      }
}
