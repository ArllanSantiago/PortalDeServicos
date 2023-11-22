import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { Cnia } from "../model/cnia";

@Injectable()
export class CniaService {
    constructor(private http: HttpClient) { }

    getLogEnviados():Observable<ResponsePagination>{
        const mokCnia:Cnia[] = [
             {id: 1, coddoc: 1, codpess: 1,descrpess: 'pessoa1', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00001'}
             ,{id: 2, coddoc: 2, codpess: 2,descrpess: 'pessoa2', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00002'}
             ,{id: 3, coddoc: 3, codpess: 3,descrpess: 'pessoa3', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00003'}
             ,{id: 4, coddoc: 4, codpess: 4,descrpess: 'pessoa4', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00004'}
             ,{id: 5, coddoc: 5, codpess: 5,descrpess: 'pessoa5', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00005'}
             ,{id: 6, coddoc: 6, codpess: 6,descrpess: 'pessoa6', dthroper:'01/01/01 00:00:00',mensagem: undefined, numproc:'00006'}                
        ]
        return  this.http.post<ResponsePagination>(`http://cnialog-api-eagle-hml.apps.ocp.trf5.gov.br/cnialogenviados`,{           
            "codSecao": 85,
            "dthrFin": "01/01/2020 00:00:00",
            "dthrIni": "01/01/2020 00:00:00",            
        });
        return  new Observable<ResponsePagination>((res)=>{
            res.next({...new ResponsePagination, content: mokCnia})      
            res.complete()
        })

    }

}