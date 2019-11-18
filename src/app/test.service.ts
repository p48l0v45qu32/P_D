import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Ngglobal } from './ngglobal';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  baseUrl = 'http://localhost:8080/api';
  tests: Ngglobal[];

  constructor(private http:HttpClient) { }

  getAll(): Observable<Ngglobal[]> {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res) => {
        this.tests = res['data'];
        console.log(this.tests);
        return this.tests;
    }),
    catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
