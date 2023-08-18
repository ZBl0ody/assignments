import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Imovie } from '../movies/Imovie';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  length: number = 0;
  TotalPrice: number = 0;
  imgPath: string = 'https://image.tmdb.org/t/p/w780';

  constructor(private myMovieService: MovieService, private router: Router) {}
  ngOnInit(): void {
    this.myMovieService.getCart().subscribe({
      next: (data) => {
        this.cart = data.cartItems;
        this.length = data.cartItems.length;
        this.cart.forEach((el: any) => {
          this.TotalPrice += Math.ceil((el.vote_count / 20) * el.quantity);
        });
      },
    });
  }

  checkOut(movie: any): void {
    this.myMovieService.checkOut(movie).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    this.router.navigate(['/movies']);
  }

  getOrders(movie: any): void {
    this.myMovieService.getOrders().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  remove(cart: any): void {
    this.myMovieService.removeFromCart(cart).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
