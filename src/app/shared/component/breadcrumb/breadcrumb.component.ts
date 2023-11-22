import { Component, Input } from "@angular/core";
import { Breadcrumb } from "./breadcrumb";


@Component({
    selector:'app-bread-crumb'
    ,templateUrl:`./breadcrumb.component.html`
})
export class BreadcrumbComponent{
    @Input() crumbs :Breadcrumb[] = []    
}