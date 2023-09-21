import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { IPlatform } from '../../interfaces/platform.interface';
import { getPlatformByAbbreviation, getPlatformByCategories, getPlatformsByCategory } from '../../platform-data';
import { PlatformCategory } from '../../enums/platform-category.enum';
import { NavigationService } from 'src/app/core/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  title = "title";
  private routerEventsSubscription!:Subscription;

  consolePlatforms:IPlatform[] = getPlatformsByCategory(PlatformCategory.Console);
  handheldPlatforms:IPlatform[] = getPlatformsByCategory(PlatformCategory.PortableConsole);
  otherPlatforms:IPlatform[] = getPlatformByCategories([
              PlatformCategory.Computer,
              PlatformCategory.Arcade,
              PlatformCategory.OperatingSystem,
              PlatformCategory.Platform]);

  
  constructor (private router:  Router,
     private authService: AuthService,
     private navigationService:NavigationService) {}

  ngOnInit(){
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