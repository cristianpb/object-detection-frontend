import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { PreviewComponent } from './preview/preview.component';
import { CamerasComponent } from './cameras/cameras.component'
import { WorkersComponent } from './workers/workers.component'

const routes: Routes = [
  { path: '', redirectTo: '/images', pathMatch: 'full' },
  { path: 'images', component: PreviewComponent },
  { path: 'cameras', component: CamerasComponent },
  { path: 'workers', component: WorkersComponent },
  { path: 'single/:filename', component: SingleComponent },
  { path: '**', component: PreviewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
