import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { SingleComponent } from './single/single.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: PreviewComponent },
  { path: 'single/:filename', component: SingleComponent },
  { path: '**', component: PreviewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
