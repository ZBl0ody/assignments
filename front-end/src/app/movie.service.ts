import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovie } from './movies/Imovie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  api_key = 'bf5853b90672756ec6a91507e4c94666';
  urlBase = 'https://api.themoviedb.org/3';
  imgPath: string = 'https://image.tmdb.org/t/p/w780';

  constructor(public http: HttpClient) {}

  getAllmovies(pageNumber: number, page_size: Number): Observable<any> {
    return this.http.get(
      `http://localhost:3000/movies/getAllMovies?page=${pageNumber}&pageSize=${page_size}`
    );
  }

  getMovieById(movieID: number): Observable<any> {
    return this.http.get(`http://localhost:3000/movies/getMovie/${movieID}`);
  }

  addToCart(movie: any): Observable<any> {
    return this.http.post(`http://localhost:3000/user/addToCart`, {
      movieId: movie._id,
    });
  }

  getCart(): Observable<any> {
    return this.http.get(`http://localhost:3000/user/getCart`);
  }

  checkOut(items: any): Observable<any> {
    return this.http.post(`http://localhost:3000/user/checkOut`, {
      cartItems: items,
    });
  }

  getOrders(): Observable<any> {
    return this.http.get(`http://localhost:3000/user/getOrders`);
  }

  removeFromCart(movie: any): Observable<any> {
    return this.http.post(`http://localhost:3000/user/removeFromCart`, {
      movieId: movie._id,
    });
  }

  movieSearch(movieName: string): Observable<any> {
    if (movieName == '') {
      return this.getAllTvShows();
    } else {
      return this.http.get(
        `${this.urlBase}/search/movie?api_key=${this.api_key}&query=${movieName}`
      );
    }
  }

  getAllTvShows(pageNumber: number = 1): Observable<any> {
    return this.http.get(
      `${this.urlBase}/tv/airing_today?api_key=${this.api_key}&page=${pageNumber}`
    );
  }
}
