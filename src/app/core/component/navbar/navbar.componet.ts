import { Component } from "@angular/core";
import { SYSDATA } from "src/app/shared/constants/app-const";

@Component({
    selector:'app-navbar'
    ,templateUrl:'./navbar.component.html'
    ,styleUrls:['./navbar.style.css']
})
export class NavbarComponent{
    SYSTEM_DATA = SYSDATA
}