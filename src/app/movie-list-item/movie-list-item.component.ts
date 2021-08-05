import { Component, Input, OnInit } from '@angular/core';
// local
import { IMovie } from '../services/movie.service';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor() { }

  ngOnInit(): void {
  }

  /** Переход на страницу фильма */
  redirectTo(): void {
    window.open(`https://www.imdb.com/title/${this.movie.id}`);
  }

}
