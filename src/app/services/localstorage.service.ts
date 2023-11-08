import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
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
    usedAddresses: ["192.168.4.1", "192.168.1.142"],
  };

  constructor(
    private ledControlService: LedcontrolService,
  ) {
    console.log("Storage Service");
  }

  async getSettings() {

    console.log("Get settings");
    console.log(JSON.stringify(this.settings));
    const { value } = await Preferences.get({ key: 'settings' })
    if (value != null) {
      console.log("Replace settings");
      let settingsStr = value.toString();
      this.settings = JSON.parse(settingsStr);
      console.log(JSON.stringify(value));
    }


    //console.log(JSON.stringify(this.settings));
    if (this.settings.usedAddresses == null) {
      this.settings.usedAddresses = ["192.168.4.1", "192.168.1.142"];
    }
    console.log(JSON.stringify(this.settings.usedAddresses));

    return this.settings;
  }

  async setSettings(settings: Settings) {
    console.log("Store settings:" + JSON.stringify(this.settings));
    await Preferences.set({ key: 'settings', value: JSON.stringify(settings) })
    this.ledControlService.setIpAddress(this.settings.address);
  }
}
