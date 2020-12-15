import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotosService } from '../photos.service';
import { Config } from '../types/config';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  cameras: string[] = [];
  tasks: string[] = [];
  filterGroup: FormGroup;
  config: Config;
  jobs: any;

  constructor(fb: FormBuilder, private photosService: PhotosService) {
    this.filterGroup = fb.group({
      cameras: new FormControl('', Validators.required),
      tasks: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.tasks = ['detection', 'tracking']
    this.loadConfig()
    this.fetchJobs()
  }

  loadConfig() {
    this.photosService.getConfig().subscribe((data: Config) => {
      this.config = data;
      this.cameras = data.cameras.map(x => x.name)
    })
  }

  onSubmit() {
    this.photosService.taskStart({camera: this.filterGroup.value.cameras, task: this.filterGroup.value.tasks}).subscribe((data: any) => {
      console.log(data);
    })
  }

  stopJob() {
    this.photosService.taskStop({camera: this.filterGroup.value.cameras, task: this.filterGroup.value.tasks}).subscribe((data: any) => {
      console.log(data);
    })
  }

  fetchJobs() {
    this.photosService.taskJobs().subscribe(data => {
      this.jobs = data
    })
  }

}
