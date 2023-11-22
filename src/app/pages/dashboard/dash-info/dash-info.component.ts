import { Component, OnInit } from "@angular/core";
import { SettingService, ControlGroupDash, SettingPreferences } from "src/app/core/component/setting/setting.service";
@Component({
    templateUrl: './dash-info.component.html'
})
export class DashInfoComponent implements OnInit{
   controlGroupDash: ControlGroupDash[] = (new SettingPreferences()).controlGroupDash
       
    constructor(private settingServ: SettingService) {

        // Emite os controladores das Informação da DashBoard  
        settingServ.controlGroupDashInitial.emit(this.controlGroupDash)   
    }  
    ngOnInit(): void {              
        SettingService.preferences.subscribe(setting =>{
            this.controlGroupDash = setting.controlGroupDash;                        
        })
        console.log('Escrito',SettingService.preferences);  
        
    }

}