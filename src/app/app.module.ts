import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { NavLinkComponent } from './components/nav-link/nav-link.component';
import { OverviewCardsComponent } from './components/overview-cards/overview-cards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavLinkComponent,
    OverviewCardsComponent,
    DashboardOverviewComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
