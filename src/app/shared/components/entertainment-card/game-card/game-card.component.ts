import { Component, Input } from '@angular/core';
import { IGameDisplay } from '../../../interfaces/game-display.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!:IGameDisplay;
  @Input() score!:number;



  constructor(){
    
  }
}
