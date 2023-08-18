import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private myMovieService: MovieService) {}
  userOrders: { items: any[]; user: any; _id: string }[] = [];
  imgPath: string = 'https://image.tmdb.org/t/p/w780';

  ngOnInit(): void {
    this.myMovieService.getOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.userOrders = orders;
      },
    });
  }
}
