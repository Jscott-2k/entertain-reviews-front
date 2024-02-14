import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef, createComponent } from '@angular/core';
import { ReviewType } from 'src/app/shared/enums/review-type.enum';
import { GameCardComponent } from './game-card/game-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { TvCardComponent } from './tv-card/tv-card.component';
import { EntertainmentCardDirective } from '../../directives/review-card/entertainment-card.directive';
import { IGameCard } from '../../interfaces/game-card.interface';

@Component({
  selector: 'app-entertainment-card',
  templateUrl: './entertainment-card.component.html',
  styleUrls: ['./entertainment-card.component.scss']
})
export class EntertainmentCardComponent implements OnInit{

  @Input() type!: ReviewType;
  
  @Input() title: string = "title";
  @Input() id: number = -1;
  @Input() summary: string = "summary";
  @Input() platforms: string[] = [];
  @Input() firstReleaseDate: number = 2019;
  @Input() coverImageURL: string = "";
  
  averageScore:number = 0; // update later to get from ApiSerivce 

  @ViewChild(EntertainmentCardDirective, { static: true }) reviewCard!: EntertainmentCardDirective;
  cardTypes = ReviewType;
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadDynamicComponent(this.type);
  }

  loadDynamicComponent(type: ReviewType) {

    const vfr = this.reviewCard.viewContainerRef;
    vfr.clear();

    const componentMap = new Map<ReviewType, Type<any>>([
      [ReviewType.Game, GameCardComponent],
      [ReviewType.TV, TvCardComponent],
      [ReviewType.Movie, MovieCardComponent],
    ]);

    const component = componentMap.get(type);

    if(component){
      const componentRef = vfr.createComponent(component);
      const game:IGameCard = {
        title: this.title,
        id: this.id,
        summary: this.summary,
        platforms: this.platforms,
        firstReleaseDate: this.firstReleaseDate,
        coverImageURL: this.coverImageURL
      }
      componentRef.setInput("game",game);
      componentRef.setInput("score",this.averageScore)
    }
  }
}