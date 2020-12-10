import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Worker } from './worker';
import { Tasks } from './tasks';
import { Params } from './params-photos';
import { ImageItem } from './image-item';
import { Config } from './types/config';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  deleteImage(img) {
    const formData: FormData = new FormData();
    formData.append('filename', img);
    return this.http.post(`api/delete`, formData);
  }

  getFlowerWorkers() {
    return this.http.get<Worker>(`flower/api/workers`);
  }

  getFlowerTasks() {
    return this.http.get<Tasks>(`flower/api/tasks?limit=5`);
  }

  launchTracking() {
    return this.http.get<any>(`api/task/launch`);
  }

  launchContinousDetection() {
    return this.http.get<any>(`api/beat/launch`);
  }

  killTracking(task_id: string) {
    return this.http.get<any>(`api/task/kill/${task_id}`);
  }

  getSingleImage(options: any) {
    let query = new HttpParams({fromObject:options})
    return this.http.get<any>(`api/single_image`, {params: query});
  }

  getImageList(params) {
    let query = new HttpParams();
    Object.entries(params).forEach((item: any) => {
      query = query.append(item[0], item[1]);
    });
    return this.http.get<any>(`api/list_files`, {params: query})
  }

  getPhotos(params: Params) {
    let query = new HttpParams();
    let times = new Array('year', 'month', 'day', 'hour', 'minutes', 'page', 'detected_object');
    times.forEach((item) => {
      if (item in params) {
        query = query.append(item, params[item]);
      }
    })
    if (('date' in params) && (params.date !== undefined)) {
      let selectedDate = new Intl.DateTimeFormat('fr-FR').format(params.date);
      query = query.append('date', selectedDate)
    }
    return this.http.get<ImageItem[]>('api/images', {params: query});
  }

  getConfig() {
    return this.http.get<Config>('api/config');
  }

}
