import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// local
import { environment } from 'src/environments/environment';

export interface IMovie {
  id: string;
  resultType: string;
  image: string;
  title: string;
  description: string;
}

export interface ISearchMovie {
  searchType: string;
  expression: string;
  results: IMovie[] | null;
  errorMessage: string;
}

export interface IPeople {
  id: string;
  name: string;
}

export interface IPeopleWithImg {
  id: string;
  image: string;
  name: string;
  asCharacter: string;
}

export interface IGenre {
  key: string;
  value: string;
}

export interface IMovieInfo {
  id: string;
  title: string;
  year: string;
  image: string;
  releaseDate: string;
  plot: string;
  directorList: IPeople[];
  writerList: IPeople[];
  starList: IPeople[];
  actorList: IPeopleWithImg[];
  genreList: IGenre[];
  contentRating: string;
  imDbRating: string;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  searchString = '';
  movieRequested$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  movies$: BehaviorSubject<ISearchMovie> = new BehaviorSubject<ISearchMovie>({
    searchType: '',
    expression: '',
    results: [],
    errorMessage: ''
  });

  constructor(
    private http: HttpClient,
  ) { }

  // Если превышен лимит запросов в день - использовать второй apiUrl в environment

  /** Запрос на получение с сервера ISearchMovie */
  getMoviesList(filterString: string): Observable<ISearchMovie> {
    return this.http.get<ISearchMovie>(`${environment.apiUrl}/${environment.apiUrlSearchMovies}/${environment.apiKey}/${filterString}`);
  }

  /** Запрос на получение с сервера IMovieInfo */
  getMovieInfo(movieId: string): Observable<IMovieInfo> {
    return this.http.get<IMovieInfo>(`${environment.apiUrl}/${environment.apiUrlTitle}/${environment.apiKey}/${movieId}`);
  }


}
