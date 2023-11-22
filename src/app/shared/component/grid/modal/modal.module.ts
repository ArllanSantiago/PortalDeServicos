import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MovDetalheModalComponent } from "./mov-detalhe-modal/mov-detalhe-modal.component";
import { MovDetalheModalService } from "./mov-detalhe-modal/mov-detalhe-modal.service";

@NgModule({
    declarations:[MovDetalheModalComponent]
    ,imports:[CommonModule]
    ,providers:[MovDetalheModalService]
    ,exports:[MovDetalheModalComponent]
})
export class ModalModule{}