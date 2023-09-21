import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToGames(platforms: string[]): void {
    const platformsParam = platforms.join(';');
    this.router.navigate(['/entertainment/games'], {
      queryParams: { platforms: platformsParam},
    });
  }

  navigateToMovies(){
    this.router.navigate(['/entertainment/movies']);
  }

  navigateToTvShows(){
    this.router.navigate(['/entertainment/tv']);
  }
}
