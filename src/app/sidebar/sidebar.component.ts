import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Conditions, ConditionsType, selectValues } from '../params-photos';
import { PhotosService } from '../photos.service';
import { ImagesEventsService } from '../images-events.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  events: string[] = [];
  // yearField = new FormControl();
  years: selectValues[] = [];
  // monthField = new FormControl();
  months: selectValues[] = [];
  subscription: Subscription;
  filterGroup: FormGroup;

  //constructor(private imagesEventService: ImagesEventsService, private photosService: PhotosService) { 
  constructor(fb: FormBuilder, private imagesEventService: ImagesEventsService, private photosService: PhotosService) { 
    this.filterGroup = fb.group({
      years: new FormControl(''),
      months: new FormControl('')
    })
    this.subscription = imagesEventService.imageChanged$.subscribe(
      mission => {
        console.log("sidebar", mission);
    });
  }

  ngOnInit() {
    this.getSelectors('years')
    this.getSelectors('months')
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  getSelectors(condition: ConditionsType) {
    this.photosService.getImageList({condition}).subscribe(data => {
      // this.years = Object.entries(data).map(([key, value]) => `${key} (${value})`)
      //this.formGroup.value[condition] = Object.entries(data).map(([key, value]) => `${key} (${value})`)
      //this.formGroup.controls[condition].setValue(Object.entries(data).map(([key, value]) => `${key} (${value})`))
      //this[condition] = Object.entries(data).map(([key, value]) => `${key} (${value})`)
      this[condition] = Object.entries(data).map(([key, value]) => {
        return {value: key, total: value}
      })
      //console.log("acteually", this.formGroup);
    })
  }

  onFilterChange(ob: any) {
    console.log("event", ob, "val", this.filterGroup.value);
    const params = {}
    Object.entries(this.filterGroup.value).map(([key, value]: [string, selectValues[]]) => {
      if (value ) {
        params[key] = value.map(x => x.value).join(",");
      }
    });
    console.log(params);
    this.photosService.getPhotos(params).subscribe(result => {
      console.log("hereee", result);
      this.imagesEventService.updateImageList(result.images);
      result.images.forEach(item => {
        console.log(item);
        //this.images.push(item);
      });
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // this.images = [];
    // this.params.page = 0;
    // this.params.date = event.value;
    // this.getImages();
    // console.log(event.value);
  }

}
