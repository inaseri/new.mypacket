import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Banks } from '../models/banks';
import { Transactoin } from "../models/transactoin";
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

declare const require: any;

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // API path
  base_path = 'https://new.jibeman.inaseri.ir/api/';
  thisMonth: any;
  nextMonth: any;

  token = 'token';
  myDate = new Date();

  public user = localStorage.getItem('user_id');
  public isUserLoggedIn: boolean;

  constructor(private http: HttpClient) {
      const jalaali = require('jalaali-js');

      this.thisMonth = jalaali.toJalaali(this.myDate);
      this.thisMonth = this.thisMonth.jm;
      this.nextMonth = Number(this.thisMonth) + 1;
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
      catchError(this.handleError),
    );
  }

  // Login a user
  forgetPassword(item): Observable<User> {
    return this.http
    .post<User>(this.base_path + 'password_reset/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError),
    );
  }

  // Login a user
  setPassword(item): Observable<User> {
    return this.http
    .post<User>(this.base_path + 'set_password/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError),
    );
  }

  register(item): Observable<User> {
    return this.http
    .post<User>(this.base_path + 'register/', JSON.stringify(item), this.httpOptions)
    .pipe(
    retry(2),
    catchError(this.handleError)
    );
  }

  createBank(item): Observable<Banks> {
    return this.http
    .post<Banks>(this.base_path + 'banks/' + localStorage.getItem('user_id') + '/', JSON.stringify(item), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


  getList(): Observable<Banks> {
    return this.http
    .get<Banks>(this.base_path + 'banks/' + localStorage.getItem('user_id') + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deleteBank(id) {
    return this.http
    .delete<Banks>(this.base_path + 'bank/' + id + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Update bank data
  updateBank(id, item): Observable<Banks> {
    return this.http
    .put<Banks>(this.base_path + 'bank/' + id + '/', JSON.stringify(item), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getBaknItem(id): Observable<Banks> {
    return this.http
    .get<Banks>(this.base_path + 'bank/' + id + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }






  createTransaction(item, type): Observable<Transactoin> {
    return this.http
    .post<Transactoin>(this.base_path + 'transactions/' + type + '/' + localStorage.getItem('user_id') + '/' + this.thisMonth + '/' + this.nextMonth + '/', JSON.stringify(item), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getTransactionsList(type): Observable<Transactoin> {
    return this.http
    .get<Transactoin>(this.base_path + 'transactions/' + type + '/' + localStorage.getItem('user_id') + '/' + this.thisMonth + '/' + this.nextMonth + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deleteTransactions(id) {
    return this.http
    .delete<Transactoin>(this.base_path + 'edit_transactions/' + id + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getTransactionItem(id): Observable<Transactoin> {
    return this.http
    .get<Transactoin>(this.base_path + 'edit_transactions/' + id + '/', { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('token') }) })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
