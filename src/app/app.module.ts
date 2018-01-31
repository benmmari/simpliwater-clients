import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
// import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { MeterPageComponent } from './meter-page/meter-page.component';
import { SimpliwaterService } from './simpliwater.service';
import { BuyPageComponent } from './buy-page/buy-page.component';

const appRoutes: Routes = [
  { path: 'meter', component: MeterPageComponent },
    { path: 'buy', component: BuyPageComponent },
  { path: 'stats/:id', component: HomePageComponent },
  {
    path: '',
    redirectTo: '/meter',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    MeterPageComponent,
    BuyPageComponent
  ],
  providers: [SimpliwaterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
