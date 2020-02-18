import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Banks } from '../models/banks';
import { Observable, pipe, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // API path
  base_path = 'http://127.0.0.1:8000/api/';
  token = 'token';
  public user = localStorage.getItem('user_id');

  constructor(private http: HttpClient) {
  }

  // Http Options
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  // Login a user
  login(item): Observable<User> {
    return this.http
      .post<User>(this.base_path + 'login/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createBank(item): Observable<Banks> {
    return this.http
      .post<Banks>(this.base_path + 'banks/', JSON.stringify(item), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get banks data
  getList(): Observable<Banks> {
    return this.http
      .get<Banks>(this.base_path + 'banks/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
