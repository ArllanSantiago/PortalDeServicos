import { NgModule } from "@angular/core";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { DonutChartComponent } from "./donut-chart/donut-chart.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";

@NgModule({
    declarations:[
        BarChartComponent
        ,PieChartComponent
        ,LineChartComponent
        ,DonutChartComponent
    ]
    ,exports:[
        BarChartComponent
        ,PieChartComponent
        ,LineChartComponent
        ,DonutChartComponent
    ]
})
export class ChartModule{

}