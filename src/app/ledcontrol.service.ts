import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { LEDStatus, LEDStatusJSON } from './ledstatus';
import { DEFAULT_LED_STATUS } from './ledstatus-mockup';


@Injectable({
  providedIn: 'root'
})
export class LedcontrolService {
  ledStatus: LEDStatus;

  /*
  private ledGetURL = "http://192.168.1.142/api/get";
  private ledApplyURL = "http://192.168.1.142/api/apply";
  */
  private ledGetURL = "assets/ledstatus.json";
  private ledApplyURL = "assets/ledstatus.json";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ledStatus = DEFAULT_LED_STATUS;
    console.log('led message ' + this.ledStatus.message);
  }

  getLedStatus(): Observable<LEDStatusJSON> {
    console.log('get led status from:' + this.ledGetURL);
    return this.http.get<LEDStatusJSON>(this.ledGetURL).pipe(
      tap(_ => console.log('fetched led status')),
      catchError(this.handleError<LEDStatusJSON>('getLedStatus', null))
    );
  }

  saveStatus(ledstatus: LEDStatusJSON): Observable<any> {
    console.log(`Save: ` + ledstatus.Message + "mode: " + ledstatus.Mode + " Colors:[" +
      ledstatus.Brightness +
      "," + ledstatus.Red +
      "," + ledstatus.Green +
      "," + ledstatus.Blue +
      "]")
    return this.http.post(this.ledApplyURL, ledstatus, this.httpOptions).pipe(
      tap(_ => console.log(`updated led` + ledstatus.Message)),
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
