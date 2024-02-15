import { Injectable } from '@angular/core';
import { PlatformCategory } from '../shared/enums/platform-category.enum';
import { PlatformModel } from '../models/platform.model';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { ApiService } from './api.service';
import { commonPlatformNames } from '../shared/mock-platform-data';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {

  private cachedPlatforms$ = new BehaviorSubject<PlatformModel[]>([]);

  constructor(private apiService:ApiService) {}

  fetchPlatformsByCategory(...categories: PlatformCategory[]): Observable<PlatformModel[]> {
    return this.fetchAllPlatforms().pipe(
      map(platforms => {
        if (categories.length === 0) {
          return platforms;
        } else {
          return platforms.filter(platform => platform.category && categories.includes(platform.category));
        }
      })
    );
  }
  fetchCommonPlatforms(){
    return this.fetchAllPlatforms().pipe(
      map(platforms => platforms.filter(platform => platform.name && commonPlatformNames.includes(platform.name)))
    );
  }

  fetchPlatformByAbbreviation(abbreviation: string): Observable<PlatformModel | undefined> {
    return this.fetchAllPlatforms().pipe(
      map(platforms => platforms.find(platform => platform.abbreviation === abbreviation.toUpperCase()))
    );
  };

  fetchAllPlatforms(): Observable<PlatformModel[]> {
    if (!this.cachedPlatforms$.value.length) {
      this.apiService.post<PlatformModel[]>('platforms').pipe(
        shareReplay(1) // Cache the response and share it with subsequent subscribers
      ).subscribe({
        next: platforms => this.cachedPlatforms$.next(platforms),
        error: err => console.error('Error fetching all platforms:', err)
      });
    }
     return this.cachedPlatforms$.asObservable();
  }
  
  clearCache(): void {
    this.cachedPlatforms$.next([]);
  }
}