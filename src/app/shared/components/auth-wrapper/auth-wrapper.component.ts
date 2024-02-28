import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styles: [],
})
export class AuthWrapperComponent implements OnInit, OnDestroy {
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();
  private userSubscription!:Subscription;

  constructor(private userService: UserService, private authService:AuthService) {} // Inject UserService
  ngOnDestroy(): void {
    this.userSubject.next(null);
    this.userSubject.complete();
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    console.log("Initialized Auth Wrapper!");
    this.userSubscription = this.userService.loadActiveUser().subscribe(user => {
      console.log("Updating user", user);
      this.userSubject.next(user);
    });
  }
  get isAllowed(): boolean {
    return this.authService.isLoggedIn() && !!this.user$;
  }

}