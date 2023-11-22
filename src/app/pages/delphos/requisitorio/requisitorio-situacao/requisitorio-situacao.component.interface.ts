import { jsPDF } from "jspdf";
import { Ordenacao } from "src/app/shared/component/filters/ordenacao/ordenacao";
import { TipoProcesso } from "src/app/shared/component/filters/tipo-processo/tipo-processo";
import { Uf } from "src/app/shared/component/filters/uf/uf";
import { Vara } from "src/app/shared/component/filters/vara/vara";
import { SearchViewBasic } from "src/app/shared/view/search-basic-view.model";
import { RequisitorioSituacaoFilter } from "../../../../shared/view/requisitorio-situacao-view";

export interface RequisitorioSituacaoComponentInterface{  
    reqSituacaoView: SearchViewBasic;
    reqSituacaoFilter: RequisitorioSituacaoFilter;
    onSearch():void; 
    onDetailMov(e:any):void;
    onResponseMap(res:any):void;
    onSort(contentResponse:any[]):void;
    onLoadGridData(res:any):void;
    onLoadRelData():void;
    onResponseLast():any[];
    gerarText(builder: any, p_orientation:string): jsPDF;
    displayNumproc(value: string):void;
    displayDocumento(value: string):void;
    displayIntevalorSeq(value: number[]):void;
    displayIntevalorMov(value: Date[]):void;
    displayTipoProc(value: TipoProcesso):void;
    displayOrdenacao(value: Ordenacao):void;
    displayAcaoOriginaria(value: string):void;
    displayAcaoExecutoria(value: string):void;
    displayRequisitorio(value: string):void;
    displayUf(value: Uf):void;
    displayVara(value: Vara):void;
}