import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  allMovies!:any[];
  private searchValue: string = '';
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  language: string = 'en-Us';
  totalmovies!:number;
  pageSize:number=20
  currentpage:number=1

  constructor (private myMoviesService:MovieService) {}

  ngOnInit(): void
  {
    this.myMoviesService.getAllMovies(this.currentpage).subscribe({next:(response)=>{
      this.allMovies=response.results;
      this.totalmovies=response.total_results
    }})
  }

  set SearchValue(value:string)
  {
  this.searchValue=value;
  this.SearchMovies(value);
  }

  SearchMovies(moviename:string)
  {
  this.myMoviesService.searchAllMovies(moviename,this.currentpage).subscribe({next:(data)=>{
    this.allMovies=data.results
  }})
  }

 changeLanguage()
 {
  this.language= this.myMoviesService.changeLanguage()
  this.myMoviesService.getAllMovies().subscribe({
    next: (response) => {
      this.allMovies= response.results;
    },
  });
  }

  changePage(pageInfo:PageEvent)
  {
      this.currentpage=pageInfo.pageIndex+1;
      this.myMoviesService.getAllMovies(this.currentpage).subscribe(
        {
          next:(response)=>{
        this.allMovies=response.results
        this.totalmovies=response.total_results
      }
  });

  }
}
