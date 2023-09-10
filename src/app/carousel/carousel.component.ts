import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';

  @Input() title!: String;
  @Input() items!: any[];
  @Input() genresLists!: any[];
  @Input() route!: string;

}

// swiper-container
window.onload = () => {
  // swiper element
  const swiperEls: any = document.querySelectorAll('swiper-container');
  // swiper parameters
  const swiperParams = {
    slidesPerView: 1,
    breakpoints: {
      350: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
    on: {
      init() {
        // ...
      },
    },
  };

  swiperEls.forEach((el: any) => {
    // now we need to assign all parameters to Swiper element
    Object.assign(el, swiperParams);

    // and now initialize it
    el.initialize();
  });
};
