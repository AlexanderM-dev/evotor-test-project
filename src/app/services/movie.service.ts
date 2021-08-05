import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies$: BehaviorSubject<ISearchMovie> = new BehaviorSubject<ISearchMovie>({
    searchType: '',
    expression: '',
    results: [],
    errorMessage: ''
  });

  constructor(
    private http: HttpClient,
  ) { }

  /** Запрос на получение с сервера ISearchMovie (если превышен лимит запросов в день - использовать второй apiUrl в environment) */
  getMoviesList(filterString: string): Observable<ISearchMovie> {
    return this.http.get<ISearchMovie>(`${environment.apiUrl}/${filterString}`);
  }
}
