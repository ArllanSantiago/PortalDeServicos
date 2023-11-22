import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BreadcrumbComponent } from "./breadcrumb.component";

@NgModule({
    declarations: [
        BreadcrumbComponent
    ]
    , imports: [
         CommonModule    
        , FormsModule
    ]
    , exports: [
        BreadcrumbComponent
    ]
})
export class BreadCrumbModule { }
