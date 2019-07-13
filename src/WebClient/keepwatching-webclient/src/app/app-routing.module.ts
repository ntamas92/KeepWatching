import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component'
import {MediaDetailsComponent} from './media-details/media-details.component'

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'details/:detailsId', component: MediaDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
