import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from 'src/app/tv.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit{

  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  tvDetailResult:any;
  tvVideoResult:any;
  tvDirectorResult:any;
  tvCastResult:any;
  SimilarTV:any;
  tvWriterResult:any;

  constructor(public route:ActivatedRoute, private myTVService: TvService) {}

  ngOnInit():void
  {
    let getParamId = this.route.snapshot.paramMap.get('id');

    this.getTVByID(getParamId);
    this.getVideo(getParamId);
    this.geTVCast(getParamId);
    this.getSimilarTV(getParamId);
    this.getTVDirector(getParamId);
    this.getMovieWriter(getParamId);
  }

  getVoteCircleBorder() {
    const voteAverage = this.tvDetailResult.vote_average;
    let borderStyle = '5px solid ';

    if (voteAverage >= 7.5) {
      borderStyle += 'green';
    } else if (voteAverage >= 5.0) {
      borderStyle += 'yellow';
    } else {
      borderStyle += 'red';
    }
    return borderStyle;
  }

  getTVByID(id:any){
    this.myTVService.getTVById(id).subscribe(async(result)=>{
        this.tvDetailResult = result;
    });
  }


  getVideo(id:any)
  {
    this.myTVService.getTVVideo(id).subscribe((result)=>{
        result.results.forEach((element:any) => {
            if(element.type=="Trailer")
            {
              this.tvVideoResult = element.key;
            }
        });

    });
  }

  getTVDirector(id:any)
  {
    this.myTVService.getDirectorForTV(id).subscribe((result)=>{
      this.tvDirectorResult = result;
    });
  }

  getMovieWriter(id:any)
  {
    this.myTVService.getWriterForTV(id).subscribe((result)=>{
      this.tvWriterResult = result;
    });
  }

  geTVCast(id:any)
  {
    this.myTVService.getTVCast(id).subscribe((result)=>{
      this.tvCastResult = result.cast;
    });
  }

  getSimilarTV(id:any)
  {
    this.myTVService.getTVSimilar(id).subscribe((result)=>{
      this.SimilarTV = result;
    });
  }
}
