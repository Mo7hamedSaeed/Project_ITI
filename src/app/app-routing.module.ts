import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './Movie/movie/movie.component';
import { MovieDetailsComponent } from './Movie/movie-details/movie-details.component';
import { TvComponent } from './TV/tv/tv.component';
import { TvDetailsComponent } from './TV/tv-details/tv-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes =
[
  {path:'',component:HomeComponent},
  {path:'movie',component:MovieComponent},
  {path:'movie/:id',component:MovieDetailsComponent},
  {path:'tv',component:TvComponent},
  {path:'tv/:id',component:TvDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
