import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-btn-nav'
    , templateUrl: './button-nav.component.html'
})
export class ButtonNavComponent {
    constructor() {
        this._nav = [
            new ButtonNav('search')
            , new ButtonNav('clear')
        ]
    }
    _nav: ButtonNav[]
    @Input() set nav(value: ButtonNav[]) {
        this._nav = value
    }
    get nav(): ButtonNav[] {
        return this._nav;
    }
}

export class ButtonNav {
    constructor(typeAction: TypeActionNav) {
        typeAction == 'search' ?
            newSearch(this) : newClear(this)

    }
    title?: string
    iconClass?: string
    click!: () => void
    disabled!: boolean
    typeAction!: TypeActionNav


}
export type TypeActionNav = 'search' | 'clear'



export function newSearch(btn: ButtonNav) {
    btn.typeAction = "search"
    btn.click = () => alert('1')
    btn.disabled = true
    btn.iconClass = 'fa fa-search'
    btn.title = 'Consultar'

}
export function newClear(btn: ButtonNav) {
    btn.typeAction = "clear"
    btn.click = () => alert('2')
    btn.disabled = false
    btn.iconClass = 'fa fa-eraser'
    btn.title = 'Limpar'

}