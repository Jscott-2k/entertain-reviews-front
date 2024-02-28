import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  filter,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private _authenticatedUser!: SocialUser | null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user=>{
      this.loadActiveUser();
    })
  }

  loadActiveUser():Observable<UserModel | null> {
    this._authenticatedUser = this.authService.getCurrentUser();
    if(!this._authenticatedUser){
      console.error('Current user not authenticated.');
    }
    if(this._authenticatedUser){
      this.fetchCurrentUserData().subscribe(
        {
          next: (user: UserModel | null) => {
            if (user) {
              this.currentUserSubject.next(user);
            } else {
              console.error('Error fetching user data');
            }
          },
          error: (error: any) => {
            this.currentUserSubject.next(null);
            console.error('Error fetching current user data:', error);
          },
        }
      )
    }
    return this.currentUser$;
  }

  private fetchCurrentUserData(): Observable<UserModel | null> {
    if (!this.authService.isLoggedIn()) {
      return throwError(() => 'User is not logged in');
    }

    if (!this._authenticatedUser) {
      return throwError(() => 'No authenticated user found');
    }
    return this.getUserById(this._authenticatedUser.id).pipe(
      switchMap((user: UserModel | null) => {
        if (user) return of(user);
        return this._createUserHelper(this._authenticatedUser);
      })
    );
  } 

  private _createUserHelper(
    authenticatedUser: SocialUser | null
  ): Observable<UserModel | null> {

    if(!authenticatedUser){
      console.error('Error creating user. User is not logged in');
      return of(null);
    }

    return this.createUser(authenticatedUser).pipe(
      catchError((error: any) => {
        console.error('Error creating user:', error);
        return throwError(() => error);
      })
    );
  }

  getUserById(id: string): Observable<UserModel | null> {
    console.log("Fetching user data for user ", id);
    const params = new HttpParams().set('id', id);
    return this.apiService.get<UserModel>(`users`, params);
  }
  getUserByEmail(email: string): Observable<UserModel | null> {
    const params = new HttpParams().set('email', email);
    return this.apiService.get<UserModel>(`users`, params);
  }
  getUsersByDisplay(name: string): Observable<UserModel[]> {
    const params = new HttpParams().set('display', name);
    return this.apiService.get<UserModel[]>('users', params);
  }
  private createUser(authenticatedUser: SocialUser): Observable<UserModel | null> {
    const currentDate = new Date();
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000).toString();
    const userData: UserModel = {
      google_id: authenticatedUser.id,
      email: authenticatedUser.email,
      power_level: 0,
      display: authenticatedUser.name,
      date: unixTimestamp,
      avatar: 0,
      reviews: [],
      total_playtime: 0,
      likes: [],
      dislikes: [],
      helpfuls: [],
    };
    return this.apiService.post<UserModel>('users', userData);
  }
  private deleteUser(id: string) {
    return this.apiService.delete<void>(`users/${id}`);
  }
  private updateUser(user: UserModel): Observable<UserModel> {
    return this.apiService.put<UserModel>(`users/${user.google_id}`, user);
  }
}
