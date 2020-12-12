import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageItem } from './image-item'
import { Params } from './params-photos'

@Injectable()
export class ImagesEventsService {

  // Observable string sources
  private imagesChangeSource = new Subject<ImageItem[]>();
  private paramsChangeSource = new Subject<Params>();

  // Observable string streams
  imageChanged$ = this.imagesChangeSource.asObservable();
  paramsChanged$ = this.paramsChangeSource.asObservable();

  // Service message commands
  updateImageList(image: ImageItem[]) {
    this.imagesChangeSource.next(image);
  }
  updateParams(params: Params) {
    this.paramsChangeSource.next(params);
  }

}
