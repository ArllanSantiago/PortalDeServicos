import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConnection } from 'src/app/shared/constants/app-connection';
import { ResponsePagination } from 'src/app/shared/model/response-pagination.model';
import { RequestSearchByAny, RequestSearchhByAnyServiceInterface, } from 'src/app/shared/model/request.interface';


@Injectable()
export class ContasVinculadasService implements RequestSearchhByAnyServiceInterface {
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
            default:
                return this.searchByAutuac(filter);
        }
    }

    public searchByAutuac(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorDocumento`, filter).toPromise()
    }
    public searchByNumSeq(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorIntervaloSequencial?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
    public searchByNumOrig(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorAcaoOriginaria?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
    public searchByNumProc(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaNumeroProcessoNoASC?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
    public searchByNumReq(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorRequisitorio?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
    public searchByVara(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorVara?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
    public searchByAcaoExecutoria(filter: RequestSearchByAny): Promise<ResponsePagination|undefined> {
        return this.http.post<ResponsePagination|undefined>(`${this.api.APIContaVinc}/pesquisaPorAcaoExecutoria?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
    }
}
