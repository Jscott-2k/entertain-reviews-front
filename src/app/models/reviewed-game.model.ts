import { GameCoverModel } from "./game-cover.model";

export interface ReviewedGameModel {
  id: number;
  cover: GameCoverModel;
  first_release_date: number;
  name: string;
  platforms: {
    id: number;
    abbreviation: string;
  }[];
  summary: string;
}