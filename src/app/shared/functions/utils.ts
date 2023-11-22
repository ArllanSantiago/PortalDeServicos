import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";

export class utils {
  constructor() { }
  public static msg = {
    notFound :"Nenhum <b>REGISTRO</b> foi encontrado!"
    ,forbidde : 'Você não tem permissão para prosseguir'
  }
  public static regexListNumber = [
    {
      name: "rgNumberBase"
      , exp: RegExp(/^[0-9]*$/)
      , format: "0-9"
    }
  ]
  public static retirarCaracteresEsp(texto: string, lsCaracPemitidos?: string[]): string {
    let textoFinal: string = ""
    if (texto) {
      for (let index = 0; index < texto.length; index++) {
        let caracPermitido: Boolean = false
        if (lsCaracPemitidos != null) {
          caracPermitido = lsCaracPemitidos.indexOf(texto[index]) > -1
        }
        if (caracPermitido) {
          textoFinal = textoFinal + texto[index]
        } else {
          this.regexListNumber.filter(rx => rx.name == "rgNumberBase").forEach(rx => {
            textoFinal = textoFinal + (rx.exp.test(texto[index]) ? texto[index] : "")
          })
        }
      }
    }
    return textoFinal
  }

 



  public static formataDoc(doc: string, tipoDoc: 'CPF' | 'CNPJ') {
    //retira os caracteres indesejados...
    doc = doc.replace(/[^\d]/g, "");
    const listFormat:{[key:string]:{format:RegExp, mask:string}} = {
      "CPF":{format: /(\d{3})(\d{3})(\d{3})(\d{2})/, mask: "$1.$2.$3-$4"} 
      ,"CNPJ":{format: /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, mask: "$1.$2.$3/$4-$5"}
    }
    //realizar a formatação...    
    return doc.replace(listFormat[tipoDoc] .format, listFormat[tipoDoc] .mask);
  }

  public static statbackTop() {
    let mybutton = document.getElementById("btn-back-to-top") as HTMLElement ;

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  public static async loading(funcExec: Promise<any>, titulo?: string, texto?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: titulo == null ? "Atenção!" : titulo
      , text: texto == null ? "Aguarde enquanto processamos os dados para você!" : texto
      , icon: "info"
      , showConfirmButton: false
      , willOpen: () => {
        Swal.showLoading()
      }
      , didOpen: async () => {
        await funcExec.then(execSucesso => {
          if (execSucesso || execSucesso === undefined) {
            Swal.clickConfirm()
          }
        }).catch((err) => {
          Swal.close();
          type ObjErro ={
            msg:string
            ,icon:SweetAlertIcon
          }

          let objErro:ObjErro ={
            msg: '500 - internal error'
            ,icon:'error'
          }
            

          if (err instanceof HttpErrorResponse) {
            if(!!err.status){
              objErro.msg = `${err.status} - ${err.error.error} `              
            }else{
              objErro.msg = `${err.error.error} `              
              objErro.icon ='warning'
            }                        
          } else if (typeof err === "string") {
            objErro.msg = err.toString()
            objErro.icon ='info'
          } 
          Swal.fire(objErro.icon == 'error'?'Erro!':'Atenção!', objErro.msg, objErro.icon)
        })
      }
    })
  }

  public static formatterCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  //Para garantir o formato correto do Real. pois o servido esta configurado como USA
  public static correctCurrency(value: string): number {
    let _value = this.retirarCaracteresEsp(value)
    return value.length == -1 ? 0.00 : parseFloat(_value.slice(0, -2) + '.' + _value.slice(-2, _value.length))
  }
}

