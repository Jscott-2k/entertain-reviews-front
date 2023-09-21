/*
Barrel file for pages

A barrel file is an index file that exports multiple items from different files, allowing you to import them all from a single location. 
This can help keep your import statements shorter and more organized.
*/

export { HomeComponent } from './home/home.component';
export { NewsComponent } from './news/news.component';
export { EntertainmentListComponent as ReviewListComponent } from './entertainment-list/entertainment-list.component';
export { ReviewDetailedComponent } from './review-detailed/review-detailed.component';
export { AccountHistoryComponent } from './account-history/account-history.component';
export { AccountSettingsComponent } from './account-settings/account-settings.component';
export { AdvancedSearchComponent } from './advanced-search/advanced-search.component';