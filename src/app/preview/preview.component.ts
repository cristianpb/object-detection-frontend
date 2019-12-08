import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PhotosService } from '../photos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material';
import { SingleComponent } from '../single/single.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  events: string[] = [];
  images: string[] = [];
  tableWorkers: object[] = [];
  tableTasks: object[] = [];
  page: number;
  date: Date;
  timer;
  showCam: boolean;
  showWorkersInfo: boolean;
  fps: number;
  detection: boolean;
  singleImage: any;
  displayedColumns: string[] = ['workerValue', 'taskName', 'schedule', 'totalTasks'];
  displayedColumnsTasks: string[] = ['uuid', 'state', 'runtime', 'started'];

  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild('tableTasksRef') tableT: MatTable<any>;
  //@ViewChild(MatTable) tableW: MatTable<any>;

  constructor(private photosService: PhotosService, public dialog: MatDialog) { }

  openDialog(image) {
    const dialogRef = this.dialog.open(SingleComponent, {
      data: { filename: image },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.page = 0;
    this.fps = 3;
    this.detection = false;
    const params = {page: this.page, date: this.date};
    this.getImages(params);
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


  onScroll() {
    console.log('scrolled!!');
    console.log('size', this.images.length);
    this.page++;
    const params = {page: this.page, date: this.date};
    this.getImages(params);
  }

  getImages(params) {
    this.photosService.getPhotos(params).subscribe(result => {
      result.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }

  deleteImage(img) {
    console.log(img);
    this.photosService.deleteImage(img).subscribe(result => {
      this.images.splice(this.images.indexOf(img), 1 );
      console.log(result);
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.images = [];
    this.page = 0;
    this.date = event.value;
    const params = {page: this.page, date: this.date};
    this.getImages(params);
    console.log(event.value);
  }

}
