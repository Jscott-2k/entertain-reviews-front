import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameScoresModel } from '../models/game-scores.model';
import { GameModel } from '../models/game.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: ApiService) { }

  fetchGame(id: number | null): Observable<GameModel> {
    let data = {
      game: id
    };
    return this.apiService.post<GameModel>('game', data);
  }
  fetchScores(id: number | null): Observable<GameScoresModel> {
    let data = {
      game: id
    };
    return this.apiService.post<GameScoresModel>('game-scores', data);
  }
}