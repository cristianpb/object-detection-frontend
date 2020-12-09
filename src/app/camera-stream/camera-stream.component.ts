import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-camera-stream',
  templateUrl: './camera-stream.component.html',
  styleUrls: ['./camera-stream.component.scss']
})
export class CameraStreamComponent implements OnInit {
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
    this.photosService.getStreamImage('puto', detection, tracking).subscribe(data => {
      this.singleImage = data
    });
  }

}
