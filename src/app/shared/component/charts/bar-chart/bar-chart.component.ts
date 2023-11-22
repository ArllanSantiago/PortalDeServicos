import { Component, AfterViewInit, Input } from "@angular/core";
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Decimation, Filler, Legend, Title, Tooltip, PieController, ArcElement } from "chart.js";
import { ColorsChart } from "../chart";

@Component({
    selector: 'app-bar-chart'
    , templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements AfterViewInit {
    constructor() {
        Chart.register(BarElement, BarController, ArcElement, CategoryScale,LinearScale, PieController, Decimation, Filler, Legend, Title, Tooltip);
    }
    @Input() nameColumns!: string[]
    @Input() datasets!:DataSetBarChart[]
 
    _idChart:string = 'barChart'
    @Input() set idChart(value:string){this._idChart = value};
    get idChart():string {
        return this._idChart
    } 
    


    
    context?: CanvasRenderingContext2D;
    barCanvas?:HTMLCanvasElement;    
    ngAfterViewInit(): void {
        this.barCanvas = <HTMLCanvasElement>document.getElementById(this.idChart)    
        this.context  = <CanvasRenderingContext2D>this.barCanvas.getContext('2d');           
        new Chart(this.context, {
            type: 'bar',
            data: {
                labels: this.nameColumns,
                datasets: this.datasets.map(dt => {return {...dt,hoverOffset:80}})
            },

            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}    

export type DataSetBarChart ={
    label:string
    data:number[]
    backgroundColor:ColorsChart[] | string[]
    borderColor:ColorsChart[] | string[]
    borderWidth:number
}