import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { AdvancedSearchComponent } from './pages/advanced-search/advanced-search.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';
import { EntertainmentListComponent as EntertainmentListComponent } from './pages/entertainment-list/entertainment-list.component';
import { AuthGuard } from './guards/auth.guard';
import { GameDetailComponent, GameReviewComponent } from './pages';

const routes: Routes = [{
  path:'news', component:NewsComponent
},{
  path:'profile', component:ProfileComponent,

},{
  path:'search', component:AdvancedSearchComponent
},{
  path:'create', component:CreateReviewComponent,
  canActivate:[AuthGuard]
},{
  path:'entertainment/:type', component:EntertainmentListComponent,
},{
  path:'entertainment/:type/platforms/:platforms/games', component:EntertainmentListComponent,
},{
  path:'reviews/:type/platform/:platform/game/:game', component:EntertainmentListComponent,
},{
  path:'game/:game', component:GameDetailComponent,
},{
  path:'game/:game/review/:review', component:GameReviewComponent,
},
{
  path:'', component:HomeComponent 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
