import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from '../photos.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  tableWorkers: object[] = [];
  tableTasks: object[] = [];
  stats: any;
  continousDetectionId: number;
  displayedColumnsTasks: string[] = ['uuid', 'state', 'runtime', 'started', 'action'];
  displayedColumns: string[] = ['workerValue', 'taskName', 'schedule', 'totalTasks'];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild('tableTasksRef', { static: false }) tableT: MatTable<any>;
  //@ViewChild(MatTable) tableW: MatTable<any>;

  constructor(private photosService: PhotosService) {
  }

  ngOnInit() {
    this.tableWorkers = [];
    this.tableTasks = [];
    this.getWorkers();
    this.getTasks();
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

  continousDetection() {
    this.photosService.launchContinousDetection().subscribe(data => {
      this.continousDetectionId = data['task_id']
      this.getTasks()
    })
  }

  getWorkers() {
    this.photosService.getFlowerWorkers().subscribe(data => {
      console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        if (value.stats && value.stats.pool) {
          this.stats = {
            workerName: key,
            registered: value.registered,
            concurrency: value.stats.pool['max-concurrency']
          }
        }
        if (value.conf.beat_schedule) {
          Object.entries(value.conf.beat_schedule).forEach(([subKey, subValue]) => {
            this.tableWorkers.push({
              workerValue: key,
              taskName: value.conf.beat_schedule[subKey].task,
              schedule: value.conf.beat_schedule[subKey].schedule,
              total: value.stats.total[value.conf.beat_schedule[subKey].task]
            });
            this.table.renderRows();
          });
        }
      });
    });
  }


  killTracking(task_id: string) {
    this.photosService.killTracking(task_id).subscribe(data => {
      console.log(data);
      this.tableTasks = [];
      this.getTasks();
    });
  }

}
