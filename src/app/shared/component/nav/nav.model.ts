import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonNavComponent } from "./button-nav/button-nav.component";

@NgModule({
    declarations:[
        ButtonNavComponent
    ]
    ,imports:[
        CommonModule
    ]
    ,exports:[
        ButtonNavComponent
        
    ]
})
export class NavModule{}