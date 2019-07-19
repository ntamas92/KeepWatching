import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MediaDetailsComponent} from './components/media-details/media-details.component'
import { DetailedSearchComponent } from './components/detailed-search/detailed-search.component';

const routes: Routes = [
  {path: 'details/:detailsId', component: MediaDetailsComponent},
  {path: 'search/:query', component: DetailedSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
