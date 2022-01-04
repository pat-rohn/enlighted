import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { LEDStatus, LEDStatusJSON } from './ledstatus';
import { DEFAULT_LED_STATUS } from './ledstatus-mockup';
import { Settings } from './settings';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class LedcontrolService {
  ipAddress?: string;
  ledStatus: LEDStatus;

  private ledGetURL = "/api/get";
  private ledApplyURL = "/api/apply";

  private useDummy: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private localstorageService: LocalstorageService) {
    this.ledStatus = DEFAULT_LED_STATUS;
    console.log('led message ' + this.ledStatus.message);
  }

  public setIpAddress(address:string){
   this.ipAddress = address;
  }

  getLedStatus(): Observable<LEDStatusJSON> {
    let url = "http://" + this.ipAddress + this.ledGetURL
    console.log('get led status from:' + url);
    if (this.useDummy) {
      url = "assets/ledstatus.json";
    }
    return this.http.get<LEDStatusJSON>(url).pipe(
      tap(_ => console.log('fetched led status')),
      catchError(this.handleError<LEDStatusJSON>('getLedStatus', null))
    );
  }

  saveStatus(ledstatus: LEDStatusJSON): Observable<any> {
    let url = "http://" + this.ipAddress + this.ledApplyURL
    console.log('get led status from:' + url);
    console.log(`Save: ` + ledstatus.Message + "mode: " + ledstatus.Mode + " Colors:[" +
      ledstatus.Brightness +
      "," + ledstatus.Red +
      "," + ledstatus.Green +
      "," + ledstatus.Blue +
      "]")
    return this.http.post(url, ledstatus, this.httpOptions).pipe(
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
