import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosService } from '../photos.service';
import { MatTable } from '@angular/material';

export interface PeriodicElement {
  name: string;
  camera: string;
  action: string;
  task: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Object detection', camera: 'off', action: 'start', task: 'detection'},
  {name: 'Object tracking', camera: 'off', action: 'start', task: 'tracking'},
  {name: 'Mouvement detection', camera: 'off', action: 'start', task: 'mouvement'},
  {name: 'Time lapse', camera: 'off', action: 'start', task: 'time-lapse'}
];

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private photosService: PhotosService) {
  }

  clickAction(name: string) {
    console.log("click", name);
  }

  ngOnInit() {
  }

}
