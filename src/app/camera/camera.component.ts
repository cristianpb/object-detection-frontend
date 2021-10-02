import { Component, OnInit, Input } from '@angular/core';
import { PhotosService } from '../photos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  @Input() cameraName: string;
  timer: any;
  singleImage: any;
  tracking: boolean;
  detection: boolean;
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private photosService: PhotosService) {
    this.formGroup = fb.group({
      tracking: new FormControl(false),
      detection: new FormControl(false),
      framesPerSecond: new FormControl(1, Validators.min(0))
    });
  }

  ngOnInit() {
    this.detection = false;
    this.tracking = false;
    this.timer = setInterval(() => {
      this.getSingleImage({cameraName: this.cameraName, ...this.formGroup.value})
    }, Math.floor(1000/this.formGroup.value.framesPerSecond));
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getSingleImage(options: any) {
    this.photosService.getSingleImage(options).subscribe(data => {
      this.singleImage = data
    });
  }

  changeFps(value: any) {
    clearInterval(this.timer);
    console.log("change to ", value, "and", this.formGroup.value.framesPerSecond);
    this.timer = setInterval(() => {
      this.getSingleImage({cameraName: this.cameraName, ...this.formGroup.value})
    }, Math.floor(1000/Number(this.formGroup.value.framesPerSecond)));
  }

}
