import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageItem } from './image-item'

@Injectable()
export class ImagesEventsService {

  // Observable string sources
  private imagesChangeSource = new Subject<ImageItem[]>();

  // Observable string streams
  imageChanged$ = this.imagesChangeSource.asObservable();

  // Service message commands
  updateImageList(image: ImageItem[]) {
    this.imagesChangeSource.next(image);
  }

}
