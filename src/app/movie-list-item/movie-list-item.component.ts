import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// local
import { IMovie } from '../services/movie.service';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Переход на страницу фильма */
  redirectTo(): void {
    this.router.navigate([`${this.movie.id}`]);
  }

}
