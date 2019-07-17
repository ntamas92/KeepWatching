import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MediaDetailsComponent} from './components/media-details/media-details.component'

const routes: Routes = [
  {path: 'details/:detailsId', component: MediaDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
