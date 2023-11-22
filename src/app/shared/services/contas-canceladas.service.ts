import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConnection } from 'src/app/shared/constants/app-connection';
import { RequestSearchByAny, RequestSearchhByAnyServiceInterface } from 'src/app/shared/model/request.interface';

@Injectable()
export class ContasCanceladasService implements RequestSearchhByAnyServiceInterface {
  constructor(private http:HttpClient, private api: AppConnection) { }
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
  public searchByAutuac(filter: RequestSearchByAny): Promise<any> {      
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorDocumento/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByNumSeq(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorIntervaloSequencial/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByNumOrig(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorAcaoOriginaria/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByNumProc(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaNumeroProcessoNoTrf5/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByNumReq(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorRequisitorio/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByVara(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorVara/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
  public searchByAcaoExecutoria(filter: RequestSearchByAny): Promise<any> {
      return this.http.post<any>(`${this.api.APIContaLevant}${filter.extParams != "1" ? '/cnl' : ''}/pesquisaPorAcaoExecutoria/?sort=${filter.urlParams?.sort}&page=${filter.urlParams?.page}`, filter.data).toPromise()
  }
}

