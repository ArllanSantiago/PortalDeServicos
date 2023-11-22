import { ThisReceiver } from "@angular/compiler";
import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Chart, BarElement, BarController, ArcElement, CategoryScale, LinearScale, PieController, Decimation, Filler, Legend, Title, Tooltip } from "chart.js";
import { ColorsChart } from "../chart";

@Component({
    selector: 'app-donut-chart'
    , templateUrl: './donut-chart.component.html'
})
export class DonutChartComponent implements AfterViewInit {
    constructor(private cd :ChangeDetectorRef) {
        Chart.register(BarElement, BarController, ArcElement, CategoryScale, LinearScale, PieController, Decimation, Filler, Legend, Title, Tooltip);
       
    }
    @Input() nameColumns!: string[]
    @Input() datasets!: DataSetDonutChart[]
    @Input() tittle!:string
    _idChart: string = 'donutChart'
    @Input() set idChart(value: string) { this._idChart = value };
    get idChart(): string {
        return this._idChart
    }
    chart?: Chart = undefined;
    context?: CanvasRenderingContext2D;
    pieCanvas?: HTMLCanvasElement;
    ngAfterViewInit(): void {
        this.createChart()
        this.cd.checkNoChanges()
    }

    createChart(){
        this.pieCanvas = <HTMLCanvasElement>document.getElementById(this.idChart)
        this.context = <CanvasRenderingContext2D>this.pieCanvas.getContext('2d');
        this.chart = new Chart(this.context, {
            type: 'doughnut',
            data: {
                labels: this.nameColumns,
                datasets: this.datasets.map(dt => { return { ...dt, hoverOffset: 10 } })
            },

            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display:false
                    }
                    , title: {
                        text: this.tittle
                        ,display:true
                        ,position:'bottom'
                        ,align:'center'
                       // ,padding:{}
                    }
                }
            }
        });
    }
}

export type DataSetDonutChart = {
    label: string
    data: number[]
    backgroundColor: ColorsChart[] | string[]
    borderColor: ColorsChart[] | string[]
    borderWidth: number
}

export type DonutChart = {
    idChart:string 
    tittle:string
    columns:string[]
    dataSets:DataSetDonutChart[]
}