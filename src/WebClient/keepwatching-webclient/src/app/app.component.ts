import { Component } from '@angular/core';
import { MediaAccessService, IMediaSearchResult } from './services/media-access.service'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keepwatching-webclient'
  executingQuery: string = null;
  pendingQuery: string = null;
  searchResult: IMediaSearchResult[] = null;
  mediaAccessService : MediaAccessService;

  constructor(mediaAccessService: MediaAccessService){
    this.mediaAccessService = mediaAccessService;
  }

  handleInputChange(value: string) {
    if(this.executingQuery !== null){
      this.pendingQuery = value;
    }
    else{
      this.executingQuery = value;
      this.getSearchResult(value)
    }
  }

  getSearchResult(query: string)  {    
    var onCompleted = () => {
      this.executingQuery = this.pendingQuery;
      this.pendingQuery = null;

      if(this.executingQuery !== null)
        this.getSearchResult(this.executingQuery);
    }

    this.mediaAccessService.fetchMediaSearchResult(query).subscribe({
      next:result => this.searchResult = result, 
      complete:onCompleted
    });
  }
}
