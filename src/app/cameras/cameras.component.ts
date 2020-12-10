import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';
import { Config } from '../types/config';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {
  config: Config;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.loadConfig()
  }

  loadConfig() {
    this.photosService.getConfig().subscribe((data: Config) => {
      this.config = data;
    })
  }

}
