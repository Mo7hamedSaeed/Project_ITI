import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatPaginatorModule } from '@angular/';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

import { MovieComponent } from './Movie/movie/movie.component';
import { MovieDetailsComponent } from './Movie/movie-details/movie-details.component';
import { TvDetailsComponent } from './TV/tv-details/tv-details.component';
import { TvComponent } from './TV/tv/tv.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    SearchComponent,
    MovieComponent,
    MovieDetailsComponent,
    TvDetailsComponent,
    TvComponent,
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
