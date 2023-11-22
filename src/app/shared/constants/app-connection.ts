import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
 })
export class AppConnection{
   private linkServe(op?:string):{
      apiAPP:string
      , apiContaVinc:string, apiContaCancel:string, apiContaLevant:string
      , apiOficioSituacaoReq:string

   }{
      switch (op) {
         case "H":  return {
            apiAPP : "http://abreuh.ASC.gov.br:8080/IBPServiceAPI"
            ,apiContaVinc: "http://abreuh.ASC.gov.br:8080/ContaVinculadaAPI"
            ,apiContaCancel:"http://abreuh.ASC.gov.br:8080/ContaCanceladaAPI"
            ,apiContaLevant: "http://abreuh.ASC.gov.br:8080/ContaLevantamentoAPI"
            ,apiOficioSituacaoReq: "http://abreuh.ASC.gov.br:8080/OficioSituacaoRequisitorio"
         }
         case "P":  return {
            apiAPP : "https://painelprc.ASC.jus.br/IBPServiceAPI"
            ,apiContaVinc: "https://painelprc.ASC.jus.br/ContaVinculadaAPI"
            ,apiContaCancel: "https://painelprc.ASC.jus.br/ContaCanceladaAPI"
            ,apiContaLevant: "https://painelprc.ASC.jus.br/ContaLevantamentoAPI"
            ,apiOficioSituacaoReq:"https://painelprc.ASC.jus.br/OficioSituacaoRequisitorio"
         }
         default:  return {
            apiAPP : "http://localhost:8081"
            ,apiContaVinc: "http://localhost:8080"
            ,apiContaLevant: "http://localhost:8082"
            ,apiContaCancel:"http://localhost:8083"
            ,apiOficioSituacaoReq:"http://localhost:8084"
         }
      }
   }
   private op = ""
   public  APIContaVinc:string = this.linkServe(this.op).apiContaVinc
   public  APIContaLevant:string = this.linkServe(this.op).apiContaLevant;
   public  APIContaCancel:string = this.linkServe(this.op).apiContaLevant;  //A Api de Levantamento, resolve a cancelada tambem
   public  ApiOficioSituacaoReq:string = this.linkServe(this.op).apiOficioSituacaoReq;
   public  servApp:string = this.linkServe(this.op).apiAPP;
}
