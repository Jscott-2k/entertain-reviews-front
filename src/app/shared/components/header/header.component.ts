import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { PlatformModel } from '../../../models/platform.model';
import { PlatformCategory } from '../../enums/platform-category.enum';
import { NavigationService } from 'src/app/core/navigation.service';
import { PlatformService } from 'src/app/core/platform.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  title = "title";
  private routerEventsSubscription!:Subscription;

  consolePlatforms:PlatformModel[] = [];
  handheldPlatforms:PlatformModel[] = [];
  otherPlatforms:PlatformModel[] = [];
  commonPlatforms:PlatformModel[] = [];
  
  constructor (private router:  Router,
     private authService: AuthService,
     private navigationService:NavigationService, private platformService:PlatformService) {}

  ngOnInit(){
    this.platformService.fetchPlatformsByCategory(PlatformCategory.Console).subscribe(consolePlatforms => {
      this.consolePlatforms = consolePlatforms;
    });
    
    this.platformService.fetchPlatformsByCategory(PlatformCategory.PortableConsole).subscribe(handheldPlatforms => {
      this.handheldPlatforms = handheldPlatforms;
    });
    
    this.platformService.fetchPlatformsByCategory(
      PlatformCategory.Computer,
      PlatformCategory.Arcade,
      PlatformCategory.OperatingSystem,
      PlatformCategory.Platform
    ).subscribe(otherPlatforms => {
      this.otherPlatforms = otherPlatforms;
    });
  
    this.platformService.fetchCommonPlatforms().subscribe(commonPlatforms => {
      this.commonPlatforms = commonPlatforms;
    });

    this.routerEventsSubscription = this.router.events.subscribe( (event) => (event instanceof NavigationEnd)  && this.handleRouteChange());
  }
  ngOnDestroy(){
    this.routerEventsSubscription.unsubscribe();
  }
  get isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
  get user():SocialUser | null{
    return this.authService.getCurrentUser();
  }
  logout(){
    this.authService.logout();
  }
  handleRouteChange(){

    const routeTitleMap: { [key: string]: string } = {
      'entertainment': 'Reviewed Entertainment',
      'profile': 'Profile',
      'news': 'News',
      'search': 'Advanced Search',
      'create': 'Write Review',
    };

    const routeSegment = this.getRouteSegmentFromUrl(this.router.url, 'Home');
    this.title = routeTitleMap[routeSegment] || 'Home';
  }

  private getRouteSegmentFromUrl(url: string, defaultRoute:string): string {
    const routeSegment = url.split('/')[1];
    return routeSegment || defaultRoute;
  }

  navigateGamesByPlatform(platform:string){
    this.navigationService.navigateToGames([platform]);
  }
}