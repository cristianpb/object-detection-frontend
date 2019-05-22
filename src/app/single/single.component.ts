import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
//import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  filename: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
    //private photosService: PhotosService
  ) { }

  ngOnInit() {
    this.filename = this.route.snapshot.paramMap.get('filename');
    console.log(this.filename);
    //const params = {page: this.page, date: this.date};
  }

  backClicked() {
    console.log('back');
    this._location.back();
  }

  //getImages(params) {
  //  console.log(params);
  //  this.photosService.getPhotos(params).subscribe(result => {
  //    result.forEach(item => {
  //      // console.log(item);
  //      this.images.push(item);
  //    });
  //  });
  //}
}
