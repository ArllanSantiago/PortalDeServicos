import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConnection } from "src/app/shared/constants/app-connection";
import { Vara } from "./vara";

@Injectable()
export class VaraService {
    constructor(private http: HttpClient, private api :AppConnection) {

    }
    buscarVaraPorDocumento( docum: string ): Promise<Vara[] | undefined> {                
      return new Promise<Vara[]>((response)=>{
        response( [
             {coduf:'PE', codvara:0,descr:'1ª Vara de PE',codcid:1} as Vara
             ,{coduf:'PE', codvara:0,descr:'2ª Vara de PE',codcid:1} as Vara
             ,{coduf:'PE', codvara:0,descr:'3ª Vara de PE',codcid:1} as Vara
             ,{coduf:'PE', codvara:0,descr:'4ª Vara de PE',codcid:1} as Vara
          ])
      })
        /*  return this.http.get<any[]>(`${this.api.APIContaVinc}/Get/%7Bdocumento%7D?documento=${docum}`).toPromise().then(resp =>
            resp?.map(function (item: any[]): Vara {return { codvara: item[1], descr: item[2], coduf: item[0] } }))*/
        
    }
    buscarVaraPorDoc( docum: string ): Observable<any> {       
        return this.http.get<any[]>(`${this.api.APIContaVinc}/Get/%7Bdocumento%7D?documento=${docum}`)     
        
    }
}