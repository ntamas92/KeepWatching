import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export interface IMediaSearchResult {
  title: string,
  posterPath: string
}

@Injectable({
  providedIn: 'root'
})
export class MediaAccessService {

  constructor(private httpClient:HttpClient) { }

  fetchMediaSearchResult(query: string) : Observable<IMediaSearchResult[]> {
     if(query === '')
      return from([[]])
    
    var params = new HttpParams().set('title', query)
    var suggestionsUri = environment.serviceUrlRoot + environment.suggestionsEndpoint
    
    return this.httpClient.get<IMediaSearchResult[]>(suggestionsUri, {params:params})    
  }


  // fetchMediaDetails(id:string) : Promise<IMediaSearchResult> {
  //   //TODO: Parameterize correctly
  //   return this.httpClient.get<IMediaSearchResult>(API_URL).toPromise()
  // }
}
