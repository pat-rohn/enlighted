import { Component, OnInit } from '@angular/core';
import { DeviceSettings, SunriseSettings, DaySetting, Settings } from '../settings'
import { LocalstorageService } from '../services/localstorage.service'
import { LedcontrolService } from '../services/ledcontrol.service';


@Component({
  selector: 'app-sunrise',
  templateUrl: './sunrise.component.html',
  styleUrls: ['./sunrise.component.scss'],
})
export class SunriseComponent implements OnInit {

  settings?: Settings;
  sunriseSettings?: SunriseSettings;
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
        this.ledcontrolService.getDeviceSettings().subscribe(res => {
          this.sunriseSettings = res.SunriseSettings;
          this.deviceSettings = res;
        },
          error => {
            console.log(JSON.stringify(error));
          }
        )
      }
    );
  }

  handleRefresh(event: any) {
    this.clickedRefresh().then(_ => {
      console.log("handle Refresher complete")
      event.target.complete()
    })
  };


  async clickedRefresh() {
    this.ledcontrolService.getDeviceSettings().subscribe(res => {
      this.sunriseSettings = res.SunriseSettings
      this.deviceSettings = res;
      console.log(JSON.stringify(res))
    }
    );
  }

  async clickedSave() {
    console.log(JSON.stringify(this.deviceSettings))
    this.ledcontrolService.applyDeviceSettings(this.deviceSettings!).subscribe(_ => {
      this.ledcontrolService.getDeviceSettings().subscribe(res => {
        this.deviceSettings = res;
        this.sunriseSettings = res.SunriseSettings;
      });
    });
  }

}


