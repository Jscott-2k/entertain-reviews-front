import { Component, Input } from '@angular/core';
import { IGameCard } from '../../../interfaces/cards/game-card.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() card!:IGameCard;
  score:number = 0;

  constructor(){
    
  }
}
