import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Settings } from '../settings'
import { DEFAULT_LED_STATUS } from '../ledstatus-mockup';
import { LedcontrolService } from './ledcontrol.service'


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  settings: Settings = {
    ledstatus: DEFAULT_LED_STATUS,
    address: "192.168.4.1",
    savedAddress1 : '192.168.4.1',
    savedAddress2 : '192.168.1.142',
    savedAddress3 : '192.168.1.241',
  };

  constructor(private ledControlService: LedcontrolService) { }

  async getSettings() {

    console.log("Get settings");
    console.log(JSON.stringify(this.settings));
    const { value } = await Storage.get({ key: 'settings' });
    if (value != null) {

      console.log("Replace settings");
      this.settings = JSON.parse(value);
      console.log(JSON.stringify(value));
    }
    //console.log(JSON.stringify(this.settings));
      console.log(this.settings.savedAddress1 );
    if (this.settings.savedAddress1 === undefined){
      this.settings.savedAddress1 = "192.168.4.1"
    }
    if (this.settings.savedAddress2 === undefined){
      this.settings.savedAddress2 = "192.168.1.142"
    }
    if (this.settings.savedAddress3 === undefined){
      this.settings.savedAddress3 = "192.168.1.241"
    }
    return this.settings;
  }

  async setSettings(settings: Settings) {
    console.log("Store settings:" + JSON.stringify(this.settings));
    await Storage.set({ key: 'settings', value: JSON.stringify(settings) })
    this.ledControlService.setIpAddress(this.settings.address);
  }
}
