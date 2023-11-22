import { ColDef } from "ag-grid-community"
import { ResponsePagination } from "src/app/shared/model/response-pagination.model"

export class GridBasic{
    constructor(){}
    columns!:ColDef[]    
    data!:ResponsePagination
}