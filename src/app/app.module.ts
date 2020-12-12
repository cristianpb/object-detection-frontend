import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table'; 
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PreviewComponent } from './preview/preview.component';
import { SingleComponent } from './single/single.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImagenamePipe } from './imagename.pipe';
import { ImageDecodePipe } from './image-decode.pipe';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { PlotsComponent } from './plots/plots.component';
import { PhotosComponent } from './photos/photos.component';
import { CameraComponent } from './camera/camera.component';
import { WorkersComponent } from './workers/workers.component';
import { IconService } from '@visurel/iconify-angular';
import { ImagesEventsService } from './images-events.service'
import { IconModule } from '@visurel/iconify-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { CamerasComponent } from './cameras/cameras.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    SingleComponent,
    ImagenamePipe,
    ImageDecodePipe,
    PlotsComponent,
    PhotosComponent,
    CameraComponent,
    WorkersComponent,
    NavbarComponent,
    CamerasComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatListModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    ChartsModule,
    MatSelectModule,
    InfiniteScrollModule,
    IconModule
  ],
  providers: [IconService, ImagesEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
