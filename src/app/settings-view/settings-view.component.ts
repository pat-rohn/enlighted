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
  enableSave = true;

  constructor(
    private localStorage: LocalstorageService,
    private ledcontrolService: LedcontrolService,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      console.log(params["id"]);
      //if (params["id"] == "Settings") {
      if (this.deviceSettings != null) {
        this.clickedRefreshDevice();
      }
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
      this.enableSave = true;
      event.target.complete()
    })
  };


  async clickedRefreshDevice() {
    console.log("Disable Save")
    this.enableSave = false;
    this.ledcontrolService.getDeviceSettings().subscribe({
      next: res => {
        this.deviceSettings = res;
        this.enableSave = true;
        console.log("Enable Save")
      },
      error: err => console.log(err),
    }
    );
  }

  async clickedApplyDeviceSettings() {
    console.log("Disable Save")
    this.enableSave = false;
    console.log(JSON.stringify(this.deviceSettings))
    this.ledcontrolService.applyDeviceSettings(this.deviceSettings!).subscribe(_ => {
      this.ledcontrolService.getDeviceSettings().subscribe(res => this.deviceSettings = res);
    });
  }

  async resetWiFi() {
    if (this.deviceSettings != null) {
      this.deviceSettings.IsConfigured = false;
      this.deviceSettings.ServerAddress = "http://localhost:3000";
      this.deviceSettings.WiFiName = "Enlighted";
      this.deviceSettings.WiFiPassword = "enlighten-me";
      this.deviceSettings.IsOfflineMode = true;
      /*this.deviceSettings.FindSensors = false;
      this.deviceSettings.SensorID = "9999";
      this.deviceSettings.NumberOfLEDs = -1;
      this.deviceSettings.DhtPin = -1;
      this.deviceSettings.WindSensorPin = -1;
      this.deviceSettings.RainfallSensorPin = -1;
      this.deviceSettings.LEDPin = -1;
      this.deviceSettings.Button1 = -1;
      this.deviceSettings.Button2 = -1;
      this.deviceSettings.ShowWebpage = true;
      this.deviceSettings.UseMQTT = true;
      this.deviceSettings.MQTTTopic = "";
      this.deviceSettings.MQTTPort = -1;
      */
    }

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


  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.resetWiFi();
      },
    },
  ];

  setResult(ev: any) {
    console.warn("reset device" + JSON.stringify(ev));
  }

}
