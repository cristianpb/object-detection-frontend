import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  timer: any;
  singleImage: any;
  fps: number;
  tracking: boolean;
  detection: boolean;

  constructor(private photosService: PhotosService) {
  }

  ngOnInit() {
    this.detection = false;
    this.fps = 3;
    this.tracking = false;
    this.timer = setInterval(() => {
      this.getSingleImage(this.detection, this.tracking)
    }, Math.floor(1000/this.fps));
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getSingleImage(detection=false, tracking=false) {
    this.photosService.getSingleImage(detection, tracking).subscribe(data => {
      this.singleImage = data
    });
  }

}
