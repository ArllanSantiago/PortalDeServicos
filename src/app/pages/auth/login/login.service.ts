import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
    constructor(private http : HttpClient){}
    doSignIn(user:any):Observable<any>{
        return this.http.post(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/login`,user)
    }
}