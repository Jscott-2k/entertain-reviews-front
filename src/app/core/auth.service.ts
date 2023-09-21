import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, map, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$ = new BehaviorSubject<SocialUser | null>(null);
  isLoggedIn$ = new BehaviorSubject<boolean | null>(null);
  
  constructor(private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.pipe(
      catchError((error) => {
        console.error('Error in AuthService:', error);
        return throwError(() => new Error('An error occurred while processing authState.'))
      })
    ).subscribe((user: SocialUser | null) => {
      this.user$.next(user);
      this.isLoggedIn$.next(user !== null);
    });
  }
  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  async logout(): Promise<void> {
    try {
      await this.socialAuthService.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
  isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue() ?? false;
  }

  getCurrentUser(): SocialUser | null {
    return this.user$.getValue();
  }

}
