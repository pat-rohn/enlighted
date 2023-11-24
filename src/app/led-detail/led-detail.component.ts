import { Component, OnInit } from '@angular/core';

import { LedcontrolService } from '../services/ledcontrol.service';
import { LEDStatus, LEDStatusJSON, LabeledLedMode, LED_ON, LED_OFF, LED_PULSE, LED_CAMPFIRE, LED_COLORS, LED_SUNRISE, LEDMode } from '../ledstatus';
import { Settings, DeviceSettings } from '../settings'
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-led-detail',
  templateUrl: './led-detail.component.html',
  styleUrls: ['./led-detail.component.scss'],
})
export class LedDetailComponent implements OnInit {
  ledStatusJson?: LEDStatusJSON;

  isReady = true;

  ledStatus: LEDStatus = {
    red: 0,
    green: 0,
    blue: 0,
    brightness: 35,
    mode: LED_OFF,
    message: "Not Connected",
  };
  settings?: Settings;
  deviceSettings?: DeviceSettings;

  ledModes: LabeledLedMode[] = [
    LED_ON,
    LED_OFF,
    LED_CAMPFIRE,
    LED_COLORS,
    LED_SUNRISE,
    LED_PULSE,
  ];

  constructor(private ledcontrolService: LedcontrolService,
    private localStorage: LocalstorageService) {
  }

  async ngOnInit() {

    console.log("On init");
    this.settings = await this.localStorage.getSettings();
    this.ledcontrolService.setIpAddress(this.settings.address);
    this.ledcontrolService.getDeviceSettings().subscribe(res => {
      this.deviceSettings = res
      this.ledcontrolService.getLedStatus().subscribe(
        {
          next: (ledJson) => {
            console.log('Answer:' + JSON.stringify(ledJson));
            this.applyLEDStatus(ledJson);
          },
          error: (error) => {
            console.error('Observer got an error: ' + error)
            this.isReady = false;
          },
          complete: () => {
          }
        }
      )
    });

    if (this.ledStatus != null) {
      console.log("On init: " + this.ledStatus.message);
    }
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  onSliderChange(ev: Event) {
    this.onSave();
  }


  onSelectChange(value: LabeledLedMode): void {
    console.log("ion change");
    this.isReady = false
    var mode = value;
    if (this.ledStatus) {
      console.log("change mode");
      this.ledStatus.mode = mode;
      if (this.ledStatus.mode == null) {
        console.log("mode not defined: " + value);
      }
      this.ledcontrolService.saveStatus(this.getJson())
        .subscribe({
          next: (ledJson) => {
            console.log('Answer:' + JSON.stringify(ledJson));
            this.isReady = true;
          },
          error: (error) => {
            console.error('Observer got an error: ' + error)
            this.ledStatus = {
              red: 0,
              green: 0,
              blue: 0,
              brightness: 0,
              message: "No connection",
              mode: LED_OFF
            }
          },
        });
    }
  }

  onSave(): void {
    if (this.ledStatus) {
      this.isReady = false;
      this.ledcontrolService.saveStatus(this.getJson())
        .subscribe(
          {
            next: (ledJson) => {
              console.log('Answer:' + JSON.stringify(ledJson));
              this.isReady = true;
            },
            error: (error) => {
              console.error('Observer got an error: ' + error)
              this.ledStatus = {
                red: 0,
                green: 0,
                blue: 0,
                brightness: 0,
                message: "No connection",
                mode: LED_OFF
              }
            },
          }
        );
    }
  }

  onPower(): void {
    this.isReady = false
    if (this.ledStatus) {
      if (this.ledStatus.mode != LED_OFF) {
        this.ledStatus.mode = LED_OFF;
        console.log("Power button: turn off");
      } else {
        this.ledStatus.mode = LED_ON;
        console.log("Power button: turn on");
      }
     this.onSave();
    }
  }

  handleRefresh(event: any) {
    this.onRefresh().then(_ => {
      console.log("handle Refresher complete")
      event.target.complete()
      this.isReady = true;
    }
    )
  };

  async onRefresh() {
    this.isReady = false
    this.ledcontrolService.getDeviceSettings().subscribe(res => {
      this.deviceSettings = res
      this.ledcontrolService.getLedStatus().subscribe(
        {
          next: (ledJson) => {
            console.log('Answer:' + JSON.stringify(ledJson));
            this.isReady = true
          },
          error: (error) => {
            console.error('Observer got an error: ' + error)
            this.ledStatus = {
              red: 0,
              green: 0,
              blue: 0,
              brightness: 0,
              message: "No connection",
              mode: LED_OFF
            }
          },
          complete: () => {
          }
        }
      )
    });
  }

  onChangeColor() {
    this.isReady = false;
    this.ledcontrolService.getLedStatus()
      .subscribe(ledstatus => {
        let color = Math.floor(Math.random() * 6)
        switch (color) {
          case 0:
            console.log("red");
            this.ledStatus!.message = "red"
            ledstatus.Red = 100;
            ledstatus.Blue = 0;
            ledstatus.Green = 0;
            break;
          case 1:
            console.log("blue");
            this.ledStatus!.message = "blue"
            ledstatus.Red = 0;
            ledstatus.Blue = 100;
            ledstatus.Green = 0;
            break;
          case 2:
            console.log("green");
            this.ledStatus!.message = "green"
            ledstatus.Red = 0;
            ledstatus.Blue = 0;
            ledstatus.Green = 100;
            break;
          case 3:
            console.log("bg");
            this.ledStatus!.message = "bg"
            ledstatus.Red = 0;
            ledstatus.Blue = 50;
            ledstatus.Green = 50;
            break;
          case 4:
            console.log("rg");
            this.ledStatus!.message = "rg"
            ledstatus.Red = 50;
            ledstatus.Blue = 0;
            ledstatus.Green = 50;
            break;
          case 5:
            console.log("rb");
            this.ledStatus!.message = "rb"
            ledstatus.Red = 50;
            ledstatus.Blue = 50;
            ledstatus.Green = 0;
            break;
        }

        this.applyLEDStatus(ledstatus)
        this.onSave()
      });
  }

  compareFn(e1: LabeledLedMode, e2: LabeledLedMode): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  applyLEDStatus(jsonStatus: LEDStatusJSON) {
    if (this.ledStatus == null) {
      this.ledStatus = {
        red: jsonStatus.Red,
        green: jsonStatus.Green,
        blue: jsonStatus.Blue,
        brightness: jsonStatus.Brightness,
        mode: LED_OFF,
        message: jsonStatus.Message
      }
    } else {

      this.ledStatus.message = jsonStatus.Message;
      this.ledStatus.brightness = jsonStatus.Brightness;
      this.ledStatus.red = jsonStatus.Red;
      this.ledStatus.green = jsonStatus.Green;
      this.ledStatus.blue = jsonStatus.Blue;
      this.ledStatus.mode.id = jsonStatus.Mode;

    }
    console.log("Mode:" + this.ledStatus.mode.id);
  }

  getJson(): LEDStatusJSON {
    var jsonLED: LEDStatusJSON = {
      Red: this.ledStatus!.red,
      Green: this.ledStatus!.green,
      Blue: this.ledStatus!.blue,
      Brightness: this.ledStatus!.brightness,
      Mode: this.ledStatus!.mode.id,
      Message: this.ledStatus!.message,
    }
    return jsonLED;
  }
}
