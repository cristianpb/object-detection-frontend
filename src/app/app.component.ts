import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'; 
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'object-detection';

  events: string[] = [];
  images: string[] = [];
  page: number;
  date: Date;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.page = 0;
    this.getImages({page: this.page});
    console.log('Today', this.date);
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.images = [];
    this.page = 0;
    this.date = event.value;
    const params = {page: this.page, date: this.date};
    this.getImages(params);
    console.log(event.value);
    console.log(event.value.getDay());
    console.log(event.value.getMonth());
    console.log(event.value.getDate());
  }
}
