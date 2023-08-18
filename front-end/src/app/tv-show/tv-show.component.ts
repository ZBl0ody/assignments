import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css'],
})
export class TvShowComponent {
  tvShows: any = [];
  total_pages: number = 0;
  current_page: number = 1;
  imgPath: string = '';
  // myMovieServiec: MovieService = new MovieService();
  constructor(public myMovieServiec: MovieService) {}
  ngOnInit(): void {
    this.myMovieServiec.getAllTvShows(this.current_page).subscribe({
      next: (data) => {
        this.tvShows = data.results;
        this.total_pages = data.total_results;
      },
    });
    this.imgPath = this.myMovieServiec.imgPath;
  }

  buyticket(movie: any): void {
    if (movie.vote_count !== 0) {
      movie.vote_count -= 1;
    }
  }

  changePage(page: PageEvent) {
    this.current_page = page.pageIndex + 1;
    this.myMovieServiec.getAllTvShows(this.current_page).subscribe({
      next: (data) => {
        this.tvShows = data.results;
      },
    });
  }
}
