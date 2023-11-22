import { Component, Input } from "@angular/core";
import { ControlDash } from "src/app/core/component/setting/setting.service";
import { ColorsChart } from "src/app/shared/component/charts/chart";
import { DonutChart, DataSetDonutChart } from "src/app/shared/component/charts/donut-chart/donut-chart.component";
import { LineChart, DataSetLineChart } from "src/app/shared/component/charts/line-chart/line-chart.component";

@Component({
    selector: 'app-info-autuacao'
    , templateUrl: './info-autuacao.component.html'
})
export class InfoAutuacaoComponent {
    year =new Date().getFullYear()
    @Input()ctrl!:ControlDash
    // Dados esperados
    resumoSecoes = [
        { secao: 'SJCE', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
        , { secao: 'SJRN', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
        , { secao: 'SJPB', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
        , { secao: 'SJPE', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
        , { secao: 'SJAL', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
        , { secao: 'SJSE', numAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), numNaoAutuac: Array<number>(12).fill(0).map(i => this.getRandomBetween(1000, 8000)), codtipproc: 388 }
    ]

    getRandomBetween(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    //Dados do grafico de rosquinha
    donutAutuacao: DonutChart[] = this.resumoSecoes.map(res => {
        return {
            idChart: res.secao
            , tittle: res.secao
            , columns: ['Autuados', 'Não Autuados']
            , dataSets: [
                {
                    label: res.secao
                    , data: [res.numAutuac.reduce((sum, current) => { return sum + current }), res.numNaoAutuac.reduce((sum, current) => { return sum + current })]
                    , backgroundColor: [ColorsChart.green, ColorsChart.red]
                    , borderColor: [ColorsChart.green.replace(')', ',0.2)'), ColorsChart.red.replace(')', ',0.2)')]
                } as DataSetDonutChart
            ]
        }
    })


    //dados do grafico de linha 
    lineAutuacao: LineChart = {
        idChart: 'lineAutuacaoAno'
        , columns: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        , dataSets: this.resumoSecoes.map(res => {
            return {
                label: res.secao
                , data: res.numAutuac
                , borderColor: Object.values(ColorsChart)[this.resumoSecoes.indexOf(res)]
                , backgroundColor: Object.values(ColorsChart)[this.resumoSecoes.indexOf(res)].replace(')', ',0.2)')
                , fill: false
                , tension: 0.5
            } as DataSetLineChart
        })
    }

    //dashAutuacao
    dashAutuacao = [
        {
            title: 'Precatorios'
            , donuts: { title: 'Autuados x Não Autuados', charts: this.donutAutuacao }
            , line: { title:' Autuados - Mês', chart: this.lineAutuacao}
        }
        , {
            title: "Rpv's"
            , donuts: { title: 'Autuados x Não Autuados', charts: this.donutAutuacao }
            , line: { title: ' Autuados - Mês', chart: this.lineAutuacao }
        }
    ]

}