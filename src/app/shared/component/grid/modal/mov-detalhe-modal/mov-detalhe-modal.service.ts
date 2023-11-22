import { EventEmitter, Injectable } from "@angular/core";
import { MovDetalheModel } from "./mov-detalhe-modal";

@Injectable()
export class MovDetalheModalService{
    loadDetail = new EventEmitter<MovDetalheModel>();    
}