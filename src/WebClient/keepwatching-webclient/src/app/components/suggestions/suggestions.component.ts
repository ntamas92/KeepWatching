import { Component, OnInit } from '@angular/core';
import { MediaAccessService, IMediaSearchResult, IPagedResult } from '../../services/media-access.service'


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  
  ngOnInit(): void { }

  executingQuery: string = null;
  pendingQuery: string = null;
  searchResult: IPagedResult = null;
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
      next:result => { this.searchResult = result }, 
      complete:onCompleted
    });
  }
}
