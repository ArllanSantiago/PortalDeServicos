import { Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { SettingPreferences, SettingService, THEME_DEFAULT } from "./setting.service";

@Component({
    selector: 'app-setting'
    , templateUrl: './setting.component.html'
})

export class SettingComponent {
    _settingPreferences: SettingPreferences = new SettingPreferences
    get settingPreferences() {
        return this._settingPreferences
    }
    set settingPreferences(value: SettingPreferences) {
        this._settingPreferences = value
    }


    constructor(private settingServ: SettingService, private router: Router) {

        //Config. inicial dos controles , habilita o grupo se houver algum controle habilitado
        this.settingServ.controlGroupDashInitial.subscribe(grpInfo => {
            console.log('')
            const groupCtrlSetting =  grpInfo.map(group =>{
                return {
                    ...group
                    ,enabled : group.controls.filter(info => info.enabled ).length > 0 
                }
            })
            console.log('SetConfig',this.settingPreferences)
            
            
             // Adicioando os Grupos de Controles o obj de Config. Preferencias                      
            this.settingPreferences = { ...this.settingPreferences, controlGroupDash: groupCtrlSetting}

        })
        this.router.events.subscribe(event => {
            // Sempre que uma Navigação iniciar, ou mudar de pag. será inicializado o grupo de control
            if (event instanceof NavigationStart) {
                this.settingPreferences = { ...this.settingPreferences, controlGroupDash: [] }
            }
        })
    }

    //Aplica as configurações
    applySettings(event: any) {
        if (event.target.id == 'theme') {
            this.settingPreferences.theme = event.target.checked ? 'dark' : THEME_DEFAULT
        } else {
            this.settingPreferences.controlGroupDash.map(group => {
                let idx = group.controls.findIndex(item => item.id == event.target.id )
                return (idx > -1) ? { ...group
                    , controls: [...group.controls, group.controls[idx].active = event.target.checked] } 
                : group
            })
        }
        
        console.log('EmitirSetting',this.settingPreferences)
        SettingService.preferences.emit(this.settingPreferences)
    }
}



