import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PhotosService } from '../photos.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleComponent } from '../single/single.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  events: string[] = [];
  images: string[] = [];
  page: number;
  date: Date;
  timer;
  showCam: boolean;
  fps: number;
  singleImage: any;

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
    const params = {page: this.page, date: this.date};
    this.getImages(params);
    console.log('Today', this.date);
    this.getSingleImage()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getSingleImage() {
    this.photosService.getSingleImage().subscribe(data => {
      this.singleImage = data
    });
  }

  toggleCam() {
    if (this.showCam === true) {
      this.showCam = false;
      clearInterval(this.timer);
    } else {
      this.showCam = true;
      this.timer = setInterval(() => {
        this.getSingleImage()
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
    console.log(params);
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
