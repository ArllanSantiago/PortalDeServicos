import { Component } from "@angular/core";
import { SettingService } from "src/app/core/component/setting/setting.service";
import { routerTransition } from "src/app/shared/animation/router-animation";


@Component({
    templateUrl: './dashboard.component.html'
    , animations: [
        routerTransition
    ]
})
export class DashboardComponent {
    constructor() {
        SettingService.preferences.subscribe(setting => {
            console.log('SubDash1')
            // Observa quando algum controlador é acionado     
            this.classMain = setting.theme == "dark" ? 'sidebar-mini dark-mode' : 'sidebar-mini'
        })
    }

    classMain: string = 'sidebar-mini'
    getState(outlet: any) {
        // Changing the activatedRouteData.state triggers the animation
        return outlet.activatedRouteData.state;
    }
}