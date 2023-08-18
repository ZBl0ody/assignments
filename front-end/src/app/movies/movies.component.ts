import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { PageEvent } from '@angular/material/paginator';
import { Imovie } from './Imovie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Imovie[] = [];
  private search_val: string = '';
  total_items: number = 100;
  pages_size: number = 5;
  current_page: number = 1;
  imgPath: string = '';
  constructor(public myMovieServiec: MovieService) {}
  ngOnInit(): void {
    this.myMovieServiec
      .getAllmovies(this.current_page, this.pages_size)
      .subscribe({
        next: (data) => {
          this.movies = data.movies;
          this.total_items = data.totalMoviesCount;
        },
      });
    this.imgPath = this.myMovieServiec.imgPath;
  }
  set searchVal(val: string) {
    this.search_val = val;
    this.getSearch(val);
  }
  getSearch(searchData: string) {
    this.myMovieServiec.movieSearch(searchData).subscribe({
      next: (searchResulte) => {
        this.movies = searchResulte.results;
      },
    });
  }

  addToCard(movie: Imovie): void {
    console.log(movie);

    this.myMovieServiec.addToCart(movie).subscribe({
      next: (data) => {
        // console.log(data);
      },
    });
  }
  changePage(page: PageEvent) {
    this.current_page = page.pageIndex + 1;
    this.pages_size = page.pageSize;
    this.myMovieServiec
      .getAllmovies(this.current_page, this.pages_size)
      .subscribe({
        next: (data) => {
          this.movies = data.movies;
          this.total_items = data.totalMoviesCount;
        },
      });
  }
}
