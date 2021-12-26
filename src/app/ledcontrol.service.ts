import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LEDStatus } from './ledstatus';
import { LED_STATUS } from './ledstatus-mockup';

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

  getLedStatus(): Observable<LEDStatus>  {
    const l = of(LED_STATUS);
    return l;
  }

}
