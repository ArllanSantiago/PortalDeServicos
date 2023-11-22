import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { XlsxModule } from "../xlsx/xlsx.module";
import { GridBasicComponent } from "./grid-basic/grid-basic.component";
import { ModalModule } from "./modal/modal.module";
import { ButtonRendererComponent } from "./renderer/button-renderer/button-renderer.component";

@NgModule({
    declarations: [GridBasicComponent
        , ButtonRendererComponent    
    ]
    , imports: [FormsModule
        , CommonModule
        , AgGridModule.withComponents([ButtonRendererComponent])
        , ModalModule
        , XlsxModule        
    ]
    , exports: [GridBasicComponent]
})
export class GridModule {

}