import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PhotosService } from '../photos.service';
import { MatTable } from '@angular/material';
import { ImageItem } from '../image-item';
import { Params } from '../params-photos';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  events: string[] = [];
  images: ImageItem[] = [];
  tableWorkers: object[] = [];
  tableTasks: object[] = [];
  params: Params = {};
  timer: any;
  showCam: boolean;
  showWorkersInfo: boolean;
  fps: number;
  detection: boolean;
  singleImage: any;
  displayedColumns: string[] = ['workerValue', 'taskName', 'schedule', 'totalTasks'];
  displayedColumnsTasks: string[] = ['uuid', 'state', 'runtime', 'started'];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  @ViewChild('tableTasksRef', { static: false }) tableT: MatTable<any>;
  //@ViewChild(MatTable) tableW: MatTable<any>;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.fps = 3;
    this.detection = false;
    this.params.page = 0
    this.getImages();
  }

  onPlotClick(params) {
    this.images = [];
    this.params = params;
    this.params.page = 0
    this.getImages()
  }

  toggleWorkersInfo() {
    console.log(this.showWorkersInfo);
    this.showWorkersInfo = !this.showWorkersInfo;
    if (this.showWorkersInfo === true) {
      this.tableWorkers = [];
      this.tableTasks = [];
      this.getWorkers();
      this.getTasks();
    }
  }

  getTasks() {
    this.photosService.getFlowerTasks().subscribe(data => {
      Object.entries(data).forEach(([key, value]) => {
        this.tableTasks.push({
          uuid: value.uuid,
          state: value.state,
          started: value.started,
          runtime: value.runtime
        })
        this.tableT.renderRows();
      });
    });
  }

  getWorkers() {
    this.photosService.getFlowerWorkers().subscribe(data => {
      Object.entries(data).forEach(([key, value]) => {
        Object.entries(value.conf.beat_schedule).forEach(([subKey, subValue]) => {
          this.tableWorkers.push({
            workerValue: key,
            taskName: value.conf.beat_schedule[subKey].task,
            schedule: value.conf.beat_schedule[subKey].schedule,
            total: value.stats.total[value.conf.beat_schedule[subKey].task]
          });
          this.table.renderRows();
        });
      });
    });
  }

  getSingleImage(detection=false) {
    this.photosService.getSingleImage(detection).subscribe(data => {
      this.singleImage = data
    });
  }

  toggleCam(detection=false) {
    console.log(this.detection);
    if (this.showCam === true) {
      this.showCam = false;
      clearInterval(this.timer);
    } else {
      this.showCam = true;
      this.timer = setInterval(() => {
        this.getSingleImage(this.detection)
      }, Math.floor(1000/this.fps));
    }
  }


  getImages() {
    this.photosService.getPhotos(this.params).subscribe(result => {
      result.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.images = [];
    this.params.page = 0;
    this.params.date = event.value;
    this.getImages();
    console.log(event.value);
  }

}
