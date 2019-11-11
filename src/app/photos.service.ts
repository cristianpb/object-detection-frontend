import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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

  getSingleImage() {
    return this.http.get<any>(`/api/single_image`);
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
