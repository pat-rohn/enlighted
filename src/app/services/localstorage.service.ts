import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Settings } from '../settings'
import { DEFAULT_LED_STATUS } from '../ledstatus-mockup';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  
  settings: Settings = {
    ledstatus: DEFAULT_LED_STATUS,
    address: "192.168.4.1"
  };

  constructor() { }

  async getSettings() {

    console.log("Get settings");
    console.log(JSON.stringify(this.settings));
    const {value} = await Storage.get({ key: 'settings' });
    if (value != null) {

      console.log("Replace settings");
      this.settings = JSON.parse(value);
      console.log(JSON.stringify(value));
    }
    //console.log(JSON.stringify(this.settings));
    return this.settings;
  }

  async setSettings(settings: Settings) {
    console.log("Store settings:" + JSON.stringify(this.settings));
    await Storage.set({ key: 'settings', value: JSON.stringify(settings) })
  }
}
