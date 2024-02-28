import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthWrapperComponent } from 'src/app/shared/components/auth-wrapper/auth-wrapper.component';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
 
  user!:UserModel | null;
  userSub!:Subscription;
  @ViewChild(AuthWrapperComponent, { static: true }) authWrapperRef!: AuthWrapperComponent;
  constructor(){

  }
  ngOnInit() {
    this.user = null;
    this.userSub = this.authWrapperRef.user$.subscribe((user) => {
      console.log("Recieved user ", user);
      this.user = user;
    });
  }
  ngOnDestroy(): void {
    this.user = null;
    this.userSub.unsubscribe();
  }


}