import { Component, OnInit } from '@angular/core';
import { DeviceSettings, Settings } from '../settings'
import { LocalstorageService } from '../services/localstorage.service'
import { LedcontrolService } from '../services/ledcontrol.service';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements OnInit {

  settings?: Settings;
  deviceSettings?: DeviceSettings;

  constructor(
    private localStorage: LocalstorageService,
    private ledcontrolService: LedcontrolService) { }

  async ngOnInit() {
    console.log("init view comp");
    await this.localStorage.getSettings().then(
      res => {
        this.settings = res
        this.ledcontrolService.setIpAddress(this.settings.address)
        this.ledcontrolService.getDeviceSettings().subscribe(res => this.deviceSettings = res);
      }
    );
  }

  async clickedSave() {
    
    if (this.settings.usedAddresses.findIndex(element => element == this.settings.address)<0){
      this.settings.usedAddresses.push(this.settings.address)
    }
    this.localStorage.setSettings(this.settings).then(_ => this.clickedRefreshDevice())
  }

  async clickedRefreshDevice() {
    this.ledcontrolService.getDeviceSettings().subscribe(res => {
      this.deviceSettings = res
      console.log(JSON.stringify(res))
    }
    );
  }

  async clickedApplyDeviceSettings() {
    console.log(JSON.stringify(this.deviceSettings))
    this.ledcontrolService.applyDeviceSettings(this.deviceSettings).subscribe(_ => {
      this.ledcontrolService.getDeviceSettings().subscribe(res => this.deviceSettings = res);
    });
  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  handleChange(ev) {
    this.settings.address = ev.target.value;
    this.clickedSave();
  }

}
