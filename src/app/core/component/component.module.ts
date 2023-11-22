import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MAIN_ROUTES } from "src/app/pages/dashboard/dashboard.module";
import { TimeLineModule } from "src/app/shared/component/time-line/time-line.module";
import { FooterComponent } from "./footer/footer.componet";
import { NavbarComponent } from "./navbar/navbar.componet";
import { SettingComponent } from "./setting/setting.componet";
import { SettingService } from "./setting/setting.service";
import { SidebarComponent } from "./sidebar/sidebar.component";


@NgModule({
    declarations:[
        NavbarComponent
        ,SettingComponent
        ,FooterComponent
        ,SidebarComponent
    ]
    ,exports:[
        NavbarComponent
        ,SettingComponent
        ,FooterComponent 
        ,SidebarComponent
    ]
    ,imports:[           
        FormsModule
        ,CommonModule 
        ,RouterModule   
        ,TimeLineModule
    ]
    ,providers:[
        SettingService
    ]

})
export class ComponentModule{}