import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getPhotos(params) {
    let query = '';
    if ('page' in params) {
      query += `page=${params.page}`;
    }
    if (('date' in params) && (params.date !== undefined)) {
      query += `&date=${params.date.toISOString().slice(0, 10).replace(/-/g, '')}`; }
    return this.http.get<string[]>(`${environment.api}/images?${query}`);
  }
}
