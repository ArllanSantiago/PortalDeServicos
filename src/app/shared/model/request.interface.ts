export interface RequestSearchByAny{  
    data:object
    valid:boolean
    msg:string
    urlParams?: { sort?: string, page?: number }
    extParams?: any 
}

export interface RequestSearchhByAnyServiceInterface {
    searchByCheck(filter: any, chkValue: string): Promise<any>

    searchByAutuac(filter: RequestSearchByAny): Promise<any>
    searchByNumSeq(filter: RequestSearchByAny): Promise<any>
    searchByNumOrig(filter:RequestSearchByAny ): Promise<any>
    searchByNumProc(filter: RequestSearchByAny): Promise<any>
    searchByNumReq(filter: RequestSearchByAny): Promise<any>
    searchByVara(filter: RequestSearchByAny): Promise<any>
    searchByAcaoExecutoria(filter: RequestSearchByAny): Promise<any>
}