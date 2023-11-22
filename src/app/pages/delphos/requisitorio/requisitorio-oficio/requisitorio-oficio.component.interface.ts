import { SearchViewBasic } from "src/app/shared/view/search-basic-view.model";

import { RequisitorioOficioFilter } from '../../../../shared/view/requisitorio-oficio-view';

export interface RequisitorioOficioComponentInterface{
    chkGroup: string;    
    reqOficioView: SearchViewBasic;    
    reqOficioFilter: RequisitorioOficioFilter;
    onSearch():void 
}