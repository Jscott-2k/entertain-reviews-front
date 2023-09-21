import { AfterViewInit, Component, OnChanges, ViewChild } from '@angular/core';
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
export class ProfileComponent{

  powerlevel:number = 0;
  avatarIndex:number = 1;
  averagePlaytime:number=0;
  accountAge:number = 0;
  gameBacklog:number[] = [];
  totalReviews:number = 0;
  helpfuls:number = 0;
  lastReview:number = 0;

  @ViewChild(AuthWrapperComponent,{static:true}) authWrapperRef!: AuthWrapperComponent;
  
  get displayName(){

    if(!this.authWrapperRef.user || !this.authWrapperRef.user.firstName){
      return "No Name";
    }
    return this.authWrapperRef.user.firstName;
  }

}
