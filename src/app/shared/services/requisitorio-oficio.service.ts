import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConnection } from 'src/app/shared/constants/app-connection';
import { RequestSearchByAny, RequestSearchhByAnyServiceInterface } from 'src/app/shared/model/request.interface';

@Injectable()
export class RequisitorioOficioService implements RequestSearchhByAnyServiceInterface {

    constructor(private http: HttpClient, private api: AppConnection) { }

    public searchByCheck(filter: any, chkValue: string): Promise<any> {
        switch (chkValue) {
            case "0": return this.searchByAutuac(filter);
            case "1": return this.searchByNumSeq(filter);
            case "2": return this.searchByNumOrig(filter);
            case "3": return this.searchByNumProc(filter);
            case "4": return this.searchByNumReq(filter);
            case "5": return this.searchByVara(filter);
            case "6": return this.searchByAcaoExecutoria(filter);
            default : return this.searchByAutuac(filter);
        }
    }

    private endPoint = this.api.ApiOficioSituacaoReq + '/oficio';

    public searchByAutuac(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorDocumento`, filter.data).toPromise()
    }

    public searchByNumSeq(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorIntervaloSequencial`, filter.data).toPromise()
    }
    public searchByNumOrig(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorAcaoOriginaria`, filter.data).toPromise()
    }
    public searchByNumProc(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaNumeroProcessoNoTrf5`, filter.data).toPromise()
    }
    public searchByNumReq(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorRequisitorio`, filter.data).toPromise()
    }
    public searchByVara(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorVara`, filter.data).toPromise()
    }
    public searchByAcaoExecutoria(filter: RequestSearchByAny): Promise<any> {
        return this.http.post<any>(`${this.endPoint}/pesquisaPorAcaoExecutoria`, filter.data).toPromise()
    }
    public downloadOficio(filter: RequestSearchByAny): Promise<any> {
        return this.http.post(`${this.endPoint}/retornaOficioPorDocumentoRequisitorio`
            , filter.data, { observe: 'response', responseType: 'blob' }).toPromise()
    }
}
