import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// local
import { IMovie, ISearchMovie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  searchString = '';
  timeOut?: number;

  movies: IMovie[] = [];
  movieSubscription?: Subscription;
  movieRequested = false;
  response?: ISearchMovie;

  constructor(
    public service: MovieService,
  ) {
    this.movieSubscription = this.service.movies$.subscribe((searchMovieResponse: ISearchMovie) => {
      this.movies = searchMovieResponse.results || [];
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }

  /** Запрос на получение ISearchMovie */
  searchMovies(): void {
    if (this.searchString) {
      if (this.timeOut) {
        window.clearTimeout(this.timeOut);
      }
      this.timeOut = window.setTimeout(() => {
        this.service.getMoviesList(this.searchString).subscribe({
          next: (response) => {
            this.response = response;
            this.service.movies$.next(response);
            this.movieRequested = true;
          },
          error: (err) => {
            console.log(err.error.message);
          }
        });
      }, 1000);
    } else {
      this.service.movies$.next({
        searchType: '',
        expression: '',
        results: [],
        errorMessage: ''
      });
      this.movieRequested = false;
    }
  }

}
