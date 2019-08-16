import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiKey, searchUrl } from '../../assets/config.json';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Video from '../models/video.js';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get(term: string, maxCount = 10): Observable<Video[]> {
    if (term === '') {
      return of([]);
    }

    const config = {
      params: new HttpParams()
        .set('key', apiKey)
        .set('type', 'video')
        .set('part', 'snippet')
        .set('q', term)
        .set('maxResults', maxCount.toString())
    };

    return this.http.get<Video[]>(searchUrl, config).pipe(
      map((response: any) => {
        return response.items.map(item => {
          return new Video(item.snippet.thumbnails.default.url, item.snippet.title, item.id.videoId);
        });
      })
    );
  }
}
