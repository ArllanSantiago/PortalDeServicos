import { TextOptionsLight } from "jspdf";

export interface IRelatorioPersonalizado {
    iniCabPerson?: number
    , fimCadPerson?: number
    , textOptions?: TextOptionsLight
    , iniRodaPePerson?: number
    , fimRodaPePerson?: number
    , RodaPeAlign?: string

}