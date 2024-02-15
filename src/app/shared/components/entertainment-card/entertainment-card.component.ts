import { Component, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef, createComponent } from '@angular/core';
import { EntertainmentType } from 'src/app/shared/entertainment.type';
import { GameCardComponent } from './game-card/game-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { TvCardComponent } from './tv-card/tv-card.component';
import { EntertainmentCardDirective } from '../../directives/review-card/entertainment-card.directive';
import { IEntertainmentCard } from '../../interfaces/entertainment-strategy.interface';

@Component({
  selector: 'app-entertainment-card',
  templateUrl: './entertainment-card.component.html',
  styleUrls: ['./entertainment-card.component.scss']
})
export class EntertainmentCardComponent implements OnInit{

  @Input() card!:IEntertainmentCard
  @Input() type!: EntertainmentType;
  
  @ViewChild(EntertainmentCardDirective, { static: true }) cardComponent!: EntertainmentCardDirective;
  
  private readonly components: Record<EntertainmentType, Type<any>> = {
    game: GameCardComponent,
    movie: MovieCardComponent,
    tv: TvCardComponent,
  };

  constructor() {}
  
  ngOnInit(): void {
    this.loadDynamicComponent();
  }

  loadDynamicComponent() {

    const vfr = this.cardComponent.viewContainerRef;
    vfr.clear();

    const componentType = this.components[this.type];

    if(componentType){
      const componentRef = vfr.createComponent(componentType);
      componentRef.setInput("card",this.card);
    }
  }
}