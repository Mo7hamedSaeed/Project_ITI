import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKey = 'bcd1576eb8d8a1ac65436241e7de0636';
  //https://api.themoviedb.org/3/discover/movie?api_key=bcd1576eb8d8a1ac65436241e7de0636

  language: string = 'en-Us';

  constructor(private http:HttpClient) { }

  getallMovie():Observable<any>
  {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`);
  }

  getMovieById(movieID:number):Observable<any>
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}`);
  }

  getMovieVideo(movieID:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${this.apiKey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${data}/credits?api_key=${this.apiKey}`)
  }

  getDirectorForMovie(movieId: number): Observable<string> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`).pipe(
      map((result: any) => {
        const crew = result.crew;
        const director = crew.find((member: any) => member.job === 'Director');
        return director ? director.name : null;
      })
    );
  }

  getWriterForMovie(movieId: number): Observable<string | null> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`).pipe(
      map((result: any) => {
        const crew = result.crew;
        const writer = crew.find((member: any) => member.job === 'Writer' || member.department === 'Writing');
        return writer ? writer.name : null;
      })
    );
  }

  getMovieSimilar(movie_id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${this.apiKey}`)
  }



  getAllMovies(pageNumber:number=1):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=${this.language}&page=${pageNumber}`);


  }

  searchAllMovies(movieName:string,pageNumber:number=1):Observable<any>{
    if (movieName ==''){
      return this.getAllMovies()
    } else
    {
      return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${movieName}&page=${pageNumber}`)
    }

  }
  changeLanguage() {
    this.language = this.language == 'en-Us' ? 'ar-SA' : 'en-Us';
    return this.language;
  }
}
