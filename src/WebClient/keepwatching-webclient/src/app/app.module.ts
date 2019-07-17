import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component'

@NgModule({
  declarations: [
    AppComponent,
    MediaDetailsComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
