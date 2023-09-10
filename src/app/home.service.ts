import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiKay: string = '1d9f1aa05a75b0409ab04efe585574af';

  constructor(private http: HttpClient) { }

  // get trending movie
  getTrendingMovie(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKay}`
    );
  }

  // get trending tv
  getTrendingTv(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKay}`
    );
  }

  // get top rated movies
  getTopRatedMovies(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKay}`
    );
  }

  // get the search movies and tv
  allSearch(name:string, pageNumber:number=1): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKay}&query=${name}&include_adult=false&language=en-US&page=${pageNumber}`
    );
  }

}
