import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  selectedMovieId: any = '';
  selectedMovie!: any;
  imgPath: string = '';
  genreShow: string[] = [];
  genre = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Abenteuer',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Komödie',
    },
    {
      id: 80,
      name: 'Krimi',
    },
    {
      id: 99,
      name: 'Dokumentarfilm',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Familie',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'Historie',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Musik',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Liebesfilm',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV-Film',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'Kriegsfilm',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  // myMovieServiec: MovieService = new MovieService();
  constructor(
    public myRouts: ActivatedRoute,
    public myMovieServiec: MovieService
  ) {
    this.selectedMovieId = this.myRouts.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.selectedMovie = this.myMovieServiec
      .getMovieById(this.selectedMovieId)
      .subscribe({
        next: (singelMovie) => {
          console.log('first', singelMovie);
          this.selectedMovie = singelMovie;
        },
      });
    this.imgPath = this.myMovieServiec.imgPath;
  }
  buyticket(movie: any): void {
    if (movie.vote_count !== 0) {
      movie.vote_count -= 1;
    }
  }
  genra(movie: any): void {}
}
