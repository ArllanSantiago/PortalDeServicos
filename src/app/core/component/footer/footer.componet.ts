import { Component } from "@angular/core";
import { SYSDATA } from "src/app/shared/constants/app-const";

@Component({
    selector:'app-footer'
    ,templateUrl:'./footer.component.html'
})
export class FooterComponent{
    SYSTEM_DATA = SYSDATA
    iconClass: 'fa fa-angle-up' | 'fa fa-angle-down' = 'fa fa-angle-up'
    
    onClick(){
        this.iconClass = this.iconClass == 'fa fa-angle-down'? 'fa fa-angle-up': 'fa fa-angle-down'
    }
}