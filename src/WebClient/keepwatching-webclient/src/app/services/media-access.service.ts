import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export interface IMediaSearchResult {
  title: string,
  posterPath: string
}

const API_URL = environment.mediaAccessUrl;

@Injectable({
  providedIn: 'root'
})
export class MediaAccessService {

  constructor(private httpClient:HttpClient) { }

  fetchMediaSearchResult(query: string) : Observable<IMediaSearchResult[]> {
    if(query === '')
      return from([[]])
    
    var params = new HttpParams().set('title', query)
    return this.httpClient.get<IMediaSearchResult[]>(API_URL, {params:params})    
  }
}
