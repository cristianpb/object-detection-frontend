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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PreviewComponent } from './preview/preview.component';
import { SingleComponent } from './single/single.component';
import { ImagenamePipe } from './imagename.pipe';
import { ImageDecodePipe } from './image-decode.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    SingleComponent,
    ImagenamePipe,
    ImageDecodePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatGridListModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
