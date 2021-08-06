import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// local
import { IMovie, ISearchMovie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  searchControl = new FormControl('');
  timeOut?: number;

  movies: IMovie[] = [];
  movieSubscription?: Subscription;
  controlSubscription?: Subscription;
  getMoviesListSubscription?: Subscription;
  movieRequested$: BehaviorSubject<boolean>;
  response?: ISearchMovie;

  constructor(
    public service: MovieService,
  ) {
    this.movieRequested$ = this.service.movieRequested$;
    this.movieSubscription = this.service.movies$.subscribe((searchMovieResponse: ISearchMovie) => {
      this.movies = searchMovieResponse.results || [];
    });
  }

  ngOnInit(): void {
    this.searchControl.setValue(this.service.searchString);
    this.controlSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe({
        next: (searchValue) => {
          this.service.searchString = searchValue;
          this.searchMovies(searchValue);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  /** Запрос на получение ISearchMovie */
  searchMovies(searchValue: string): void {
    if (searchValue) {
      if (this.getMoviesListSubscription) {
        this.getMoviesListSubscription.unsubscribe();
      }
      this.getMoviesListSubscription = this.service.getMoviesList(this.searchControl.value).subscribe({
        next: (response) => {
          this.response = response;
          this.service.movies$.next(response);
          this.movieRequested$.next(true);
        },
        error: (err) => {
          console.log(err.error.message);
        }
      });
    } else {
      this.service.movies$.next({
        searchType: '',
        expression: '',
        results: [],
        errorMessage: ''
      });
      this.movieRequested$.next(false);
    }
  }

}
