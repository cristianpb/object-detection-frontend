import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Worker } from './worker';
import { Tasks } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  deleteImage(img) {
    const formData: FormData = new FormData();
    formData.append('filename', img);
    return this.http.post(`/api/delete`, formData);
  }

  getFlowerWorkers() {
    return this.http.get<Worker>(`/flower/api/workers`);
  }

  getFlowerTasks() {
    return this.http.get<Tasks>(`/flower/api/tasks?limit=5`);
  }

  getSingleImage(detection=false) {
    let query = '';
    if (detection) {
      query += `detection=True`;
    }
    return this.http.get<any>(`/api/single_image?${query}`);
  }

  getPhotos(params) {
    let query = '';
    if ('page' in params) {
      query += `page=${params.page}`;
    }
    if (('date' in params) && (params.date !== undefined)) {
      query += `&date=${new Intl.DateTimeFormat('fr-FR').format(params.date)}`; }
    return this.http.get<string[]>(`/api/images?${query}`);
  }
}
