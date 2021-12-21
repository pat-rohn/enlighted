import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LEDStatus } from './ledstatus';

@Injectable({
  providedIn: 'root'
})
export class LedcontrolService {
  ledStatus: LEDStatus;
  defaultStatus: LEDStatus = {
    red: 100,
    green: 70,
    blue: 15,
    brightness: 35,
    mode: "on",
    message: "Not Initialized",
  }
  constructor() { 
    this.ledStatus = this.defaultStatus;
    console.log('led message ' + this.ledStatus.message);
  }

  ngOnInit(): void {
    this.ledStatus.message = "not connected";
  }

  getLedStatus(): Observable<LEDStatus>  {
    const l = of(this.defaultStatus);
    return l;
  }

}
