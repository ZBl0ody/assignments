import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RatingComponent } from './rating/rating.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TvShowComponent } from './tv-show/tv-show.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    MoviesComponent,
    HomeComponent,
    Page404Component,
    MovieDetailsComponent,
    RatingComponent,
    TvShowComponent,
    CartComponent,
    OrderComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
