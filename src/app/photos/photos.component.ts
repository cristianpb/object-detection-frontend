import { Component, OnDestroy, Input } from '@angular/core';
import { PhotosService } from '../photos.service';
import { SingleComponent } from '../single/single.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageItem } from '../image-item';
import { Params } from '../params-photos'
import { ImagesEventsService } from '../images-events.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnDestroy {
  @Input() images: ImageItem[];
  @Input() params: Params;
  subscriptionParams: Subscription;

  constructor(private imagesEventService: ImagesEventsService, private photosService: PhotosService, public dialog: MatDialog) {
    this.subscriptionParams = imagesEventService.paramsChanged$.subscribe(
      params => {
        this.params = params
    });
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
  }

  getImages() {
    this.photosService.getPhotos(this.params).subscribe(result => {
      result.images.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }


  openDialog(image: string) {
    const dialogRef = this.dialog.open(SingleComponent, {
      data: { filename: image },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteImage(img: string) {
    console.log(img);
    this.photosService.deleteImage(img).subscribe(result => {
      this.images.splice(this.images.map(item => item.path).indexOf(img), 1 );
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  onScroll() {
    console.log('scrolled!!');
    console.log('size', this.images.length);
    this.params.page++;
    this.imagesEventService.updateParams(this.params)
    this.getImages();
  }

}
