import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotosService } from '../photos.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Params } from '../params-photos';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  @Input() params: Params;
  @Output() paramsChange = new EventEmitter<Params>();
  month_map = {
    "01": "Jan",
    "02": "Feb",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  }

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.plotImages()
    this.plotPieChart()
    this.plotLineChart()
  }

  plotImages() {
    let params = {condition: 'month'};
    this.photosService.getImageList(params).subscribe(result => {
      Object.keys(result).forEach((key) => {
        this.barChartLabels = Object.entries(result[key]).sort((a, b) => +a[0] - +b[0]).map(item => this.month_map[item[0]]);
        this.barChartData[0].data = Object.entries(result[key]).sort((a, b) => +a[0] - +b[0]).map(item => item[1]);
        this.barChartData[0].label = key;
      })
    })
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{data: [], label: ''}]; // [ { data: [], label: 'Series A' } ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    if (active.length > 0) {
      let idx = Object.values(this.month_map).indexOf(active[0]['_model'].label)
      this.params.month = Object.entries(this.month_map)[idx][0] //active[0]['_model'].label
      this.paramsChange.emit(this.params)
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  plotPieChart() {
    let params = {condition: 'detected_object'};
    this.photosService.getImageList(params).subscribe(result => {
      this.pieChartLabels = Object.entries(result).sort((a, b) => -a[1] + +b[1]).map(item => item[0]);
      this.pieChartData = Object.entries(result).sort((a, b) => -a[1] + +b[1]).map(item => item[1]);
    })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: any[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)', 'rgba(0,255,255,0.3)','rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)', 'rgba(0,255,255,0.3)'],
    },
  ];


  // events
  public pieClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    if (active.length > 0) {
      this.params.detected_object = active[0]['_model'].label
      this.paramsChange.emit(this.params)
    }
  }

  plotLineChart() {
    let params = {condition: 'hour'};
    this.photosService.getImageList(params).subscribe(result => {
      this.lineChartLabels = Object.entries(result).sort((a, b) => +a[0] - +b[0]).map(item => item[0]);
      this.lineChartData[0].data = Object.entries(result).sort((a, b) => +a[0] - +b[0]).map(item => item[1]);
    })
  }

  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Series A' }];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        }
      }],
      yAxes: [{
        id: 'temp-y-axis',
        type: 'linear',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Number of photos'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false,
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public linechartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    if (active.length > 0) {
      this.params.hour = active[0]['_index'];
      this.paramsChange.emit(this.params)
    }
  }

}
