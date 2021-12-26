import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { LEDStatus } from './ledstatus';
import { LED_STATUS } from './ledstatus-mockup';

@Injectable({
  providedIn: 'root'
})
export class LedcontrolService {
  ledStatus: LEDStatus;
  defaultStatus: LEDStatus = LED_STATUS;

  private ledURL = 'api/ledstatus';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.ledStatus = this.defaultStatus;
    console.log('led message ' + this.ledStatus.message);
  }
  getLedStatus(): Observable<LEDStatus> {
    console.log('get led status from:' + this.ledURL);
    return this.http.get<LEDStatus>(this.ledURL).pipe(
      tap(_ => console.log('fetched led status')),
      catchError(this.handleError<LEDStatus>('getLedStatus', null))
    );
  }

  saveStatus(ledstatus: LEDStatus): Observable<any> {
    console.log(`updated led: ` + ledstatus.message)
    return this.http.put(this.ledURL, ledstatus, this.httpOptions).pipe(
      tap(_ => console.log(`updated led` + ledstatus.message)),
      catchError(this.handleError<any>('saveStatus'))
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
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
