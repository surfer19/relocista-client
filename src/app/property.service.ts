import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from './property';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(
    private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(
      'http://localhost:4000/properties?startDate=2020-05-27T12:11:07.607Z&endDate=2020-06-29T12:11:07.607Z&city=Brno'
      )
      .pipe(
        catchError(this.handleError<Property[]>('getProperties', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
