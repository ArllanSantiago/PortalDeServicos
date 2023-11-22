import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class SettingService {
    controlGroupDashInitial = new EventEmitter<ControlGroupDash[]>()
    static preferences = new EventEmitter<SettingPreferences>();
}

export const THEME_DEFAULT: Theme = 'light'
export  class  SettingPreferences {
    constructor() {
        console.log('SettingService');
        
        this.theme = THEME_DEFAULT
        this.controlGroupDash = 
        [
            {
                id: 'grpAutuacao'
                ,descr: 'Precatório e RPV'
                , enabled: true
                , controls: [
                    { id: 'ctrlAutuacao', active: true, descr: 'Autuação', enabled: true }
                    , { id: 'ctrlAtualiz', active: false, descr: 'Atualização', enabled: true }                
                ]
            } as ControlGroupDash
        ]
    }

    theme: Theme
    controlGroupDash :ControlGroupDash[]
    
}
export type Theme = 'dark' | 'light'
export type ControlDash = { id: string, active: boolean, descr: string, enabled: boolean }
export type ControlGroupDash ={ id: string, descr: string , controls: ControlDash[] , enabled: boolean}

