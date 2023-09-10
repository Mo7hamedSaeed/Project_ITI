import { Component, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';

  @Input() items!: any[];

  constructor(public searchValue: HomeComponent) {}

}
