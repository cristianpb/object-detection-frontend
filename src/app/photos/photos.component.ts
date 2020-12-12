import { Component, OnInit, Input } from '@angular/core';
import { PhotosService } from '../photos.service';
import { SingleComponent } from '../single/single.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageItem } from '../image-item';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  @Input() images: ImageItem[];
  @Input() params: any;
  // const params = {page: this.page, date: this.date};
  //@Input() page: any;
  //@Input() date: any;

  constructor(private photosService: PhotosService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  getImages() {
    this.photosService.getPhotos(this.params).subscribe(result => {
      result.images.forEach(item => {
        // console.log(item);
        this.images.push(item);
      });
    });
  }


  openDialog(image: string) {
    const dialogRef = this.dialog.open(SingleComponent, {
      data: { filename: image },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteImage(img: string) {
    console.log(img);
    this.photosService.deleteImage(img).subscribe(result => {
      this.images.splice(this.images.map(item => item.path).indexOf(img), 1 );
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  onScroll() {
    console.log('scrolled!!');
    console.log('size', this.images.length);
    //this.page++;
    this.params.page++;
    this.getImages();
  }


}
