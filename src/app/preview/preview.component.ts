import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  showCam: boolean;
  showCamStream: boolean;
  showWorkersInfo: boolean;
  showPlots: boolean;
  cardLayout: string;

  constructor(private imagesEventService: ImagesEventsService, private photosService: PhotosService, breakpointObserver: BreakpointObserver) {
    imagesEventService.imageChanged$.subscribe(
      images => {
        this.images = images
      }
    )
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.cardLayout = 'mobile';
      } else {
        this.cardLayout = 'desktop';
      }
    });
  }

  ngOnInit() {
    this.params.page = 0
    this.getImages();
  }

  onPlotClick(params) {
    this.images = [];
    this.params = params;
    this.params.page = 0
    this.getImages()
  }

  toggleWorkersInfo() {
    this.showWorkersInfo = !this.showWorkersInfo;
  }

  launchTask() {
    this.photosService.launchTracking().subscribe(data => {
      console.log(data);
    });
  }

  toggleCam() {
    if (this.showCam === true) {
      this.showCam = false;
    } else {
      this.showCam = true;
    }
  }

  toggleCamStream() {
    if (this.showCamStream === true) {
      this.showCamStream = false;
    } else {
      this.showCamStream = true;
    }
  }


  getImages() {
    this.photosService.getPhotos(this.params).subscribe(result => {
      result.images.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }

}
