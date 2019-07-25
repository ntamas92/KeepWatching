import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaAccessService, IPagedResult } from 'src/app/services/media-access.service';

@Component({
  selector: 'app-detailed-search',
  templateUrl: './detailed-search.component.html',
  styleUrls: ['./detailed-search.component.css']
})
export class DetailedSearchComponent implements OnInit {
  query: string = null;
  searchResult: IPagedResult = null;

  constructor(private route: ActivatedRoute,
              private mediaAccessService: MediaAccessService)
  { }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
    console.log(this.query)
    this.mediaAccessService.fetchMediaSearchResult(this.query).subscribe(
      {
        next: result => 
        {
          this.searchResult = result;
        }
      }
    )

    
  } 

}
