import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { OrderComponent } from './order/order.component';
import { Page404Component } from './page404/page404.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TvShowComponent } from './tv-show/tv-show.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'tvShow', component: TvShowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
