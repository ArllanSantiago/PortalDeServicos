import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConnection } from "src/app/shared/constants/app-connection";
@Injectable({
    providedIn:'root'
})
export class FilterService {
    constructor(private http:HttpClient, private api : AppConnection){}
    lsVaraByDoc(doc:string, apiOrigem:string):Promise<any>{                              
        return  this.http.get<any[]>(`${apiOrigem}/Get/%7Bdocumento%7D?documento=${doc}`).toPromise()     
    }

}
