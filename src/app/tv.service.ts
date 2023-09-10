import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  apiKey = 'bcd1576eb8d8a1ac65436241e7de0636';
  language: string = 'en-Us';

  constructor(private http: HttpClient){ }

  getAlltvShow(pageNumber:number=1): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=${this.language}&page=${pageNumber}`
    );
  }

  searchAllMovies(tvName: string,pageNumber:number=1): Observable<any> {
    if (tvName == '') {
      return this.getAlltvShow();
    } else {
      return this.http.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${tvName}&page=${pageNumber}`
      );
    }
  }
  changeLanguage() {
    this.language = this.language == 'en-Us' ? 'ar-SA' : 'en-Us';

    return this.language;
  }

  getTVById(series_id:number):Observable<any>
  {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${this.apiKey}`);
  }

  getTVVideo(series_id:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}/videos?api_key=${this.apiKey}`)
  }

  getTVCast(series_id: any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${this.apiKey}`)
  }

  getDirectorForTV(series_id: number): Observable<string> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${this.apiKey}`).pipe(
      map((result: any) => {
        const crew = result.crew;
        const director = crew.find((member: any) => member.known_for_department === 'Directing' || member.department === 'Production');
        return director ? (director.name || "Unavailable") : "Unavailable";
      })
    );
  }

  getWriterForTV(series_id: number): Observable<string> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}/credits?api_key=${this.apiKey}`).pipe(
      map((result: any) => {
        const crew = result.crew;
        const writer = crew.find((member: any) => member.known_for_department === 'Writing' || member.known_for_department === 'Writing');
        return writer ? (writer.name || "Unavailable") : "Unavailable";
      })
    );
  }

  getTVSimilar(series_id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=${this.apiKey}`)
  }
}
