import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../home.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingMovie: any[] = [];
  trendingTv: any[] = [];
  topRatedMovies: any[] = [];
  allShows: any[] = [];
  private searchValue: string = '';
  valueComponent: boolean = true;
  total!: number;
  pageSize: number = 20;
  currentPage: number = 1;
  genreMovieList: any[] = [];
  genreTvList: any[] = [];

  background() {
    const imgs: string[] = ['bg-1.jpg', 'bg-2.jpg'];
    let ind: number = Math.trunc(imgs.length * Math.random());
    return '../../assets/' + imgs[ind];
  }

  constructor(public http: HttpClient, public homeData: HomeService) {}

  ngOnInit(): void {
    // get trending Movies
    this.homeData.getTrendingMovie().subscribe({
      next: (res) => {
        this.trendingMovie = res.results;
      },
    });

    // get trending tv
    this.homeData.getTrendingTv().subscribe({
      next: (res) => {
        this.trendingTv = res.results;
      },
    });

    // get top rated movies
    this.homeData.getTopRatedMovies().subscribe({
      next: (res) => {
        this.topRatedMovies = res.results;
      },
    });

    // get genres movies list
    // this.homeData.getGenresMovies().subscribe({
    //   next: (res) => {
    //     this.genreMovieList = res.genres;
    //   },
    // });

    // get genres tv list
    // this.homeData.getGenresTv().subscribe({
    //   next: (res) => {
    //     this.genreMovieList.push(res.results);
    //   },
    // });
  }

  set setSearchValue(value: string) {
    if (value === '') {
      this.valueComponent = true;
    } else {
      this.searchValue = value;
      this.valueComponent = false;
      this.search(value);
    }
  }

  // the search movies and tv
  search(name: string) {
    this.homeData.allSearch(name, this.currentPage).subscribe({
      next: (data) => {
        this.allShows = data.results;
        this.total = data.total_results;
      },
    });
  }

  // change page the search component
  changePage(pageInfo: PageEvent) {
    this.currentPage = pageInfo.pageIndex + 1;
    this.homeData.allSearch(this.searchValue, this.currentPage).subscribe({
      next: (response) => {
        this.allShows = response.results;
        this.total = response.total_results;
      },
    });
  }

  // get genres tv and movies lists values
  // genreValue(list: any[], id: number) {
  //   list.forEach((l) => {
  //     if (l.id === id) {
  //       return l.value;
  //     }
  //   });
  // }
}

// window.onload = () => {
//   // swiper element
//   const swiperEls: any = document.querySelectorAll('swiper-container');
//   // swiper parameters
//   const swiperParams = {
//     slidesPerView: 1,
//     breakpoints: {
//       350: {
//         slidesPerView: 2,
//       },
//       768: {
//         slidesPerView: 3,
//       },
//       991: {
//         slidesPerView: 4,
//       },
//     },
//     on: {
//       init() {
//         // ...
//       },
//     },
//   };

//   swiperEls.forEach((el: any) => {
//     // now we need to assign all parameters to Swiper element
//     Object.assign(el, swiperParams);

//     // and now initialize it
//     el.initialize();
//   });
// };
