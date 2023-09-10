import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  selectedMovie:any;
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;
  getMovieDirectorResult:any;
  getMovieWriterResult:any;
  getSimilarMovies:any;

  constructor (public route:ActivatedRoute, private myMoviesService: MovieService) {}
  ngOnInit():void
  {
    let getParamId = this.route.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
    this.getMovieDirector(getParamId);
    this.getMovieWriter(getParamId);
    this.getSimilarMovie(getParamId);
  }

  getVoteCircleBorder() {
    const voteAverage = this.getMovieDetailResult.vote_average;
    let borderStyle = '5px solid ';

    if (voteAverage >= 7.5) {
      borderStyle += 'green'; // Green border for high ratings
    } else if (voteAverage >= 5.0) {
      borderStyle += 'yellow'; // Yellow border for moderate ratings
    } else {
      borderStyle += 'red'; // Red border for low ratings
    }

    return borderStyle;
  }

  getMovie(id:any){
    this.myMoviesService.getMovieById(id).subscribe({next:(result)=>{
        this.getMovieDetailResult = result;
    }});
  }

  getVideo(id:any)
  {
    this.myMoviesService.getMovieVideo(id).subscribe({next:(result)=>{
        result.results.forEach((element:any) => {
            if(element.type=="Trailer")
            {
              this.getMovieVideoResult = element.key;
            }
        });

    }});
  }

  getMovieCast(id:any)
  {
    this.myMoviesService.getMovieCast(id).subscribe({next:(result)=>{
      this.getMovieCastResult = result.cast;
    }});
  }

  getMovieDirector(id:any)
  {
    this.myMoviesService.getDirectorForMovie(id).subscribe({next:(result)=>{
      this.getMovieDirectorResult = result;
    }});
  }

  getMovieWriter(id:any)
  {
    this.myMoviesService.getWriterForMovie(id).subscribe({next:(result)=>{
      this.getMovieWriterResult = result;
    }});
  }

  getSimilarMovie(id:any)
  {
    this.myMoviesService.getMovieSimilar(id).subscribe({next:(result)=>{
      this.getSimilarMovies = result;
    }});
  }

}
