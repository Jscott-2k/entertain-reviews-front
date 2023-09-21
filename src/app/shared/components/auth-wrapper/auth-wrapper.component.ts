import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styles: []
})
export class AuthWrapperComponent {
  private _user!: SocialUser | null;
  
  constructor (private authService: AuthService) {}
  get isAllowed():boolean{
    return this.authService.isLoggedIn();
  }
  get user():SocialUser | null{

    this._user = this.authService.getCurrentUser();
    return this._user;
  }
}