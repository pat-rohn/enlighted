import { Injectable } from '@angular/core';

import { LEDStatus } from './ledstatus'
import { LED_STATUS } from './ledstatus-mockup';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const ledstatus: LEDStatus = LED_STATUS;
    ledstatus.message = "in memory mockup value";
    return { ledstatus };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(ledStatus: LEDStatus): number {
    return 1;
  }
}
