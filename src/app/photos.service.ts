import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params, Conditions } from './params-photos';
import { ImageResponse } from './image-item';
import { Config } from './types/config';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  deleteImage(img: string) {
    const formData: FormData = new FormData();
    formData.append('filename', img);
    return this.http.post(`api/delete`, formData);
  }

  taskStart(options: any) {
    let params = new HttpParams({fromObject: options})
    return this.http.get<any>(`api/task/start`, {params});
  }

  taskStop(task_id: string) {
    return this.http.get<any>(`api/task/kill/${task_id}`);
  }

  taskStatus(task_id: string) {
    return this.http.get<any>(`api/task/kill/${task_id}`);
  }

  getSingleImage(options: any) {
    let params = new HttpParams({fromObject:options})
    return this.http.get<any>(`api/single_image`, {params});
  }

  getImageList(options: Conditions) {
    let params = new HttpParams({fromObject: options})
    return this.http.get<any>(`api/list_files`, {params})
  }

  getPhotos(options: Params) {
    let params = new HttpParams({fromObject: options})
    return this.http.get<ImageResponse>('api/images', {params});
  }

  getConfig() {
    return this.http.get<Config>('api/config');
  }

}
