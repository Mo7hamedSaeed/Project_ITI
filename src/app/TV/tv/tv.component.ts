import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TvService } from 'src/app/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  private searchValue: string = '';
  toggleData: boolean = true;
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  alltvShow!: any[];
  language: string = 'en-Us';
  totaltvShow!:number;
  pageSize:number=20;
  currentPage:number=1;

  constructor(private mytvserviece: TvService){}

  ngOnInit(): void {
    this.mytvserviece.getAlltvShow(this.currentPage).subscribe({
      next: (response) => {
        console.log(response);
        this.alltvShow = response.results;
        this.totaltvShow=response.total_results
      },
    });
  }


  set setSearchValue(value: string) {
    this.searchValue = value;
    this.searchMovies(value);
  }

  toggleDescription(tvShowId: number) {
    for (const tv of this.alltvShow) {
      if (tv.id ==tvShowId ) {
        tv.showDetails = !tv.showDetails;
      }
    }
  }

  searchMovies(tvName: string) {
    this.mytvserviece.searchAllMovies(tvName,this.currentPage).subscribe({
      next: (data) => {
        this.alltvShow=data.results;

      },
    });
  }
  changeLanguage() {
    this.language= this.mytvserviece.changeLanguage()
    this.mytvserviece.getAlltvShow().subscribe({
      next: (response) => {
        this.alltvShow = response.results;
      },
    });
   }

   changePage(pageInfo:PageEvent){
    this.currentPage=pageInfo.pageIndex+1;
    this.mytvserviece.getAlltvShow(this.currentPage).subscribe({
      next: (response) => {
        console.log(response);
        this.alltvShow = response.results;
        this.totaltvShow=response.total_results
      },
    });


   }
}
