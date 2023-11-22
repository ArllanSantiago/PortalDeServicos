import { Vara } from "../component/filters/vara/vara"


export class UserLogin{
    constructor(){
        this.documento=""
        this.nome=""
        this.email=""
        this.oab=""
        this.hasProcesses=false
        this.varas = new Array<Vara>()
    }
    documento: string
    nome: string
    email: string
    oab: string
    hasProcesses: boolean
    varas?:Vara[]
}