import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameScoreModel } from '../models/game-scores.model';
import { GameModel } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  getGame(id: number | null):Observable<GameModel> {
    throw new Error('Method not implemented.');
  }
  getScores(id: number | null):Observable<GameScoreModel> {
    throw new Error('Method not implemented.');
  }
  constructor() { }
}
