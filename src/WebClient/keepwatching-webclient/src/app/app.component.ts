import { Component } from '@angular/core';
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
   numberOfQueries : number = 0;
   data: [] = null;

  handleInputChange(value: string) {
    if(this.executingQuery !== null){
      this.pendingQuery = value;
    }
    else{
      this.executingQuery = value;
      this.getSearchResult(value)
    }
  }

  async getSearchResult(query: string)  {
    this.numberOfQueries++;
    var fetchResult = await this.fetchSearchResult(query);

    this.executingQuery = this.pendingQuery;
    this.pendingQuery = null;
    this.data = fetchResult;

    if(this.executingQuery !== null) {
      await this.getSearchResult(this.executingQuery)
    }      
  }

  fetchSearchResult(query: string) : Promise<[]> {
    if(query === ''){
      return new Promise((resolve, reject) => {this.numberOfQueries = 0; resolve([]);}) 
    }
    else{
      return fetch('https://localhost:44367/api/media?title=' + query)
        .then(response => response.json())
        .then(x => { return x.map(fun => ({'title':fun.title, 'image':fun.posterPath}))})
    }
  }
}
