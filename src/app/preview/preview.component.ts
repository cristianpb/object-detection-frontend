import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';
import { ImageItem } from '../image-item';
import { Params } from '../params-photos';
import { ImagesEventsService } from '../images-events.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  images: ImageItem[] = [];
  params: Params = {};

  constructor(private imagesEventService: ImagesEventsService, private photosService: PhotosService) {
    imagesEventService.imageChanged$.subscribe(
      images => {
        this.images = images
      }
    )
    imagesEventService.paramsChanged$.subscribe(
      params => {
        this.params = params
    });
  }

  ngOnInit() {
    this.params.page = 0
    this.imagesEventService.updateParams(this.params)
    this.getImages();
  }

  // onPlotClick(params) {
  //   this.images = [];
  //   this.params = params;
  //   this.params.page = 0
  //   this.getImages()
  // }

  getImages() {
    this.photosService.getPhotos(this.params).subscribe(result => {
      result.images.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }

}
