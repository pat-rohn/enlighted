import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, timeout, tap, switchMap } from 'rxjs/operators';

import { LEDStatus, LEDStatusJSON } from '../ledstatus';
import { DEFAULT_LED_STATUS } from '../ledstatus-mockup';
import { ToastController } from '@ionic/angular';
import { DeviceSettings } from '../settings';


@Injectable({
  providedIn: 'root'
})
export class LedcontrolService {
  ipAddress?: string;
  ledStatus: LEDStatus;


  private useDummy: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient, public toastController: ToastController) {
    this.ledStatus = DEFAULT_LED_STATUS;
    console.log('led message ' + this.ledStatus.message);
  }

  public setIpAddress(address: string) {
    this.ipAddress = address;
  }

  getLedStatus(): Observable<LEDStatusJSON> {
    let url = "http://" + this.ipAddress + "/api/led"
    console.log('get led status from:' + url);
    if (this.useDummy) {
      url = "assets/ledstatus.json";
    }
    return this.http.get<LEDStatusJSON>(url).pipe(
      tap(_ => console.log('fetched led status')),
      catchError(this.handleError<LEDStatusJSON>('getLedStatus'))
    );
  }

  saveStatus(ledstatus: LEDStatusJSON): Observable<any> {
    let url = "http://" + this.ipAddress + "/api/led"
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

  getDeviceSettings(): Observable<DeviceSettings> {
    let url = "http://" + this.ipAddress + "/api/config"
    console.log('get device settings from:' + url);
    if (this.useDummy) {
      url = "assets/device-settings.json";
    }
    return this.http.get<DeviceSettings>(url).pipe(
      timeout(1000),
      tap(_ => console.log('fetched device settings')),
      catchError(this.handleError<DeviceSettings>('Get Device Settings'))
    );
  }

  getTime(): Observable<string> {

    let url = "http://" + this.ipAddress + "/api/time"
    console.log('get device settings from:' + url);
    if (this.useDummy) {
      url = "assets/time.txt";
    }
    return this.http.get(url, { responseType: 'text' }).pipe(
      timeout(1000),
      tap(_ => console.log('fetched device settings')),
      catchError(this.handleError<string>('Get Device Settings')));
  }


  applyDeviceSettings(deviceSettings: DeviceSettings): Observable<any> {
    let url = "http://" + this.ipAddress + "/api/config"
    console.log('get device settings from :' + url);
    console.log(`Apply: ` + JSON.stringify(deviceSettings))
    return this.http.post(url, deviceSettings, this.httpOptions).pipe(
      catchError(this.handleError<any>('Apply Device Settings'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);
      this.presentToast(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

}
