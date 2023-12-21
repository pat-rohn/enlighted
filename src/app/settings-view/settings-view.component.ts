import { Component, OnInit } from '@angular/core';
import { DeviceSettings, Settings } from '../settings'
import { LocalstorageService } from '../services/localstorage.service'
import { LedcontrolService } from '../services/ledcontrol.service';
import { ActivatedRoute } from '@angular/router';

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
    private ledcontrolService: LedcontrolService,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      console.log(params["id"]);
      //if (params["id"] == "Settings") {
        this.clickedRefreshDevice();
      //}
    });
  }

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

  async onSave() {
    console.log("Save address " + this.settings!.address)
    if (this.settings!.usedAddresses.findIndex(element => element == this.settings!.address) < 0) {
      this.settings!.usedAddresses.push(this.settings!.address)
    }
    this.ledcontrolService.setIpAddress(this.settings!.address)
    this.localStorage.setSettings(this.settings!).then(_ => this.clickedRefreshDevice())
  }

  handleRefresh(event: any) {
    this.ledcontrolService.setIpAddress(this.settings!.address)
    this.clickedRefreshDevice().then(_ => {
      console.log("handle Refresher complete")
      event.target.complete()
    })
  };

  async clickedRefreshDevice() {
    this.ledcontrolService.getDeviceSettings().subscribe(res => {
      this.deviceSettings = res
      console.log(JSON.stringify(res))
    }
    );
  }

  async clickedApplyDeviceSettings() {
    console.log(JSON.stringify(this.deviceSettings))
    this.ledcontrolService.applyDeviceSettings(this.deviceSettings!).subscribe(_ => {
      this.ledcontrolService.getDeviceSettings().subscribe(res => this.deviceSettings = res);
    });
  }

  newDevice(event: any) {
    let deviceAddress = event.target.value as string
    if (deviceAddress.length > 0) {
      console.log("Add new device: " + event.target.value)
      this.ledcontrolService.setIpAddress(deviceAddress)
      this.ledcontrolService.getDeviceSettings().subscribe({
        next: (res) => {
          if (res != null) {
            console.log("Succesful connected to " + res.SensorID)
            this.settings!.address = event.target.value
            this.onSave()
          } else { // todo improve
            console.error('Failed to connect to : ' + deviceAddress)
          }
        },
        error: (error) => {
          console.error('Failed to connect to : ' + deviceAddress + ' ' + error)
          throw error
        }
      });
    }
  }

  compareWith(o1: string, o2: string) {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  handleChange(ev: any) {
    this.settings!.address = ev.target.value;
    this.onSave();
  }

}
