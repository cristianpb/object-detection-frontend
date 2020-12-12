import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ConditionsType, selectValues, Params } from '../params-photos';
import { PhotosService } from '../photos.service';
import { ImagesEventsService } from '../images-events.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  years: selectValues[] = [];
  months: selectValues[] = [];
  days: selectValues[] = [];
  hours: selectValues[] = [];
  date: FormControl;
  subscriptionImages: Subscription;
  subscriptionParams: Subscription;
  filterGroup: FormGroup;
  params: Params = {};

  constructor(fb: FormBuilder, private imagesEventService: ImagesEventsService, private photosService: PhotosService) { 
    this.date =  new FormControl(new Date())
    this.filterGroup = fb.group({
      years: new FormControl(''),
      months: new FormControl(''),
      days: new FormControl(''),
      hours: new FormControl('')
    })
    this.subscriptionImages = imagesEventService.imageChanged$.subscribe(
      images => {
        console.log("sidebar", images);
    });
    this.subscriptionParams = imagesEventService.paramsChanged$.subscribe(
      params => {
        this.params = params
    });
  }

  ngOnInit() {
    this.getSelectors('years')
    this.getSelectors('months')
    this.getSelectors('days')
    this.getSelectors('hours')
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscriptionImages.unsubscribe();
    this.subscriptionParams.unsubscribe();
  }

  getSelectors(condition: ConditionsType) {
    this.photosService.getImageList({condition}).subscribe(data => {
      this[condition] = Object.entries(data).map(([key, value]) => {
        return {value: key, total: value}
      })
    })
  }

  onFilterChange() {
    Object.entries(this.filterGroup.value).map(([key, value]: [string, selectValues[]]) => {
      if (value ) {
        delete this.params.date;
        this.date =  new FormControl(new Date())
        this.params.page = 0;
        this.params[key] = value.map(x => x.value).join(",");
        this.imagesEventService.updateParams(this.params)
      }
    });
    this.photosService.getPhotos(this.params).subscribe(result => {
      this.imagesEventService.updateImageList(result.images);
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let selectedDate = new Intl.DateTimeFormat('fr-FR').format(event.value);
    this.params.page = 0;
    this.params.date = selectedDate;
    this.imagesEventService.updateParams(this.params)
    this.photosService.getPhotos(this.params).subscribe(result => {
      this.imagesEventService.updateImageList(result.images);
    });
  }

}
