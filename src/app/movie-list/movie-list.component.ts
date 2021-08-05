import { Component, Input, OnInit } from '@angular/core';
// local
import { IMovie } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input() movies: IMovie[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
