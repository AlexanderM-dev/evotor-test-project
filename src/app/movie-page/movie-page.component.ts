import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
// Local
import { IMovieInfo, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnDestroy {

  routeParams?: Subscription;
  currentMovie?: IMovieInfo;
  isLoading = false;

  constructor(
    public service: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeParams = this.route.params.subscribe((params: Params) => {
      this.service.getMovieInfo(params.id).subscribe({
        next: (response) => {
          if (response.title) {
            this.currentMovie = response;
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err.error.message);
          this.isLoading = false;
        }
      });
    });

  }

  ngOnDestroy(): void {
    if (this.routeParams) {
      this.routeParams.unsubscribe();
    }
  }

  /** Переход на IMDB */
  redirectTo(idOrKey: string, target: string): void {
    if (target === 'people') {
      window.open(`https://www.imdb.com/name/${idOrKey}`);
    }
    if (target === 'genre') {
      window.open(`https://www.imdb.com/search/title/?genres=${idOrKey}`);
    }
    if (target === 'movie') {
      window.open(`https://www.imdb.com/title/${idOrKey}`);
    }
  }

}
