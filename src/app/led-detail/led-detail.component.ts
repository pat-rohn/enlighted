import { Component, OnInit } from '@angular/core';

import { LedcontrolService } from '../services/ledcontrol.service';
import { LEDStatus, LEDStatusJSON, LabeledLedMode, LED_ON, LED_OFF, LED_PULSE, LED_CAMPFIRE, LED_COLORS, LED_AUTOCHANGE, LEDMode } from '../ledstatus';
import {Settings} from '../settings'
import { LocalstorageService } from '../services/localstorage.service';


@Component({
  selector: 'app-led-detail',
  templateUrl: './led-detail.component.html',
  styleUrls: ['./led-detail.component.scss'],
})
export class LedDetailComponent implements OnInit {
  ledStatusJson?: LEDStatusJSON;
  ledStatus?: LEDStatus;
  settings?: Settings;

  ledModes: LabeledLedMode[] = [
    LED_ON,
    LED_OFF,
    LED_CAMPFIRE,
    LED_COLORS,
    LED_AUTOCHANGE,
    LED_PULSE,
  ];

  constructor(private ledcontrolService: LedcontrolService, private localStorage: LocalstorageService) {
  }

  async ngOnInit() {

    this.settings = await this.localStorage.getSettings();
    this.ledcontrolService.setIpAddress(this.settings.address);
    this.ledcontrolService.getLedStatus()
    .subscribe(
      ledstatus => this.applyLEDStatus(ledstatus),
      /*ledstatus => {
        this.ngZone.run(() => {
          this.ledStatus = ledstatus;
        });
      }*/
    );
    this.ledcontrolService.getLedStatus()
      .subscribe(
        ledstatus => this.applyLEDStatus(ledstatus),
        /*ledstatus => {
          this.ngZone.run(() => {
            this.ledStatus = ledstatus;
          });
        }*/
      );
    if (this.ledStatus != null) {
      console.log("On init: " + this.ledStatus.message);
    }
    
  }

  formatSlider(value: number) {
    return value + "%";
  }

  sliderBrightnessOnChange(value: number) {
    console.log("brightness: " + value);
    if (this.ledStatus != null) {
      this.ledStatus.brightness = value;
      this.onSave();
    }
  }

  sliderRedOnChange(value: number) {
    console.log("red: " + value);
    if (this.ledStatus != null) {
      this.ledStatus.red = value;
      this.onSave();
    }
  }

  sliderGreenOnChange(value: number) {
    console.log("green: " + value);
    if (this.ledStatus != null) {
      this.ledStatus.green = value;
      this.onSave();
    }
  }

  sliderBlueOnChange(value: number) {
    console.log("blue: " + value);
    if (this.ledStatus != null) {
      this.ledStatus.blue = value;
      this.onSave();
    }
  }

  onSelectChange(value: LabeledLedMode): void {
    console.log("ion change");
    var mode = value;
    if (this.ledStatus) {
      console.log("change mode");
      this.ledStatus.mode = mode;
      if (this.ledStatus.mode == null) {

        //this.ledStatus.mode = {label: "on", id: (1)};
        console.log("mode not defined: " + value);
      }
      this.ledcontrolService.saveStatus(this.getJson())
        .subscribe(() => console.log("save led detail component: select"));
    }
  }

  onSave(): void {
    if (this.ledStatus) {
      this.ledcontrolService.saveStatus(this.getJson())
        .subscribe(() => console.log("save led detail component: save"));
    }
  }

  onOff(): void {
    if (this.ledStatus) {
      this.ledStatus.mode = LED_OFF;
      this.ledcontrolService.saveStatus(this.getJson())
        .subscribe(() => console.log("save led detail component: off"));
    }
  }
  onRefresh() {
    this.ledcontrolService.getLedStatus()
      .subscribe(
        ledstatus => this.applyLEDStatus(ledstatus),
        /*ledstatus => {
         this.ngZone.run(() => {
           this.ledStatus = ledstatus;
         });
       }*/
      );
    console.log("Refresh:" + this.ledStatus.message);
    console.log("Brightness:" + this.ledStatus.brightness);
    console.log("Mode:" + this.ledStatus.mode.label);
  }

  compareFn(e1: LabeledLedMode, e2: LabeledLedMode): boolean {
    // TODO: FIX INIT
    //console.log("compareFn " + e1.mode + " : " + e2.mode + " / " + e1.label + ": " + e2.label);
    //console.log("e2 " + e2.id);
    //console.log("e1 " + e1.id);
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  applyLEDStatus(jsonStatus: LEDStatusJSON) {
    var mode: LabeledLedMode = { label: "on", id: (jsonStatus.Mode) };
    if (this.ledStatus == null) {
      this.ledStatus = {
        red: jsonStatus.Red,
        green: jsonStatus.Green,
        blue: jsonStatus.Blue,
        brightness: jsonStatus.Brightness,
        mode: null,
        message: jsonStatus.Message
      }
    } else {

      this.ledStatus.message = jsonStatus.Message;
      this.ledStatus.brightness = jsonStatus.Brightness;
      this.ledStatus.red = jsonStatus.Red;
      this.ledStatus.green = jsonStatus.Green;
      this.ledStatus.blue = jsonStatus.Blue;

    }
    this.ledStatus.mode = mode;
    console.log("Mode:" + this.ledStatus.mode.id);
  }

  getJson(): LEDStatusJSON {
    var jsonLED: LEDStatusJSON = {
      Red: this.ledStatus.red,
      Green: this.ledStatus.green,
      Blue: this.ledStatus.blue,
      Brightness: this.ledStatus.brightness,
      Mode: this.ledStatus.mode.id,
      Message: this.ledStatus.message,
    }
    return jsonLED;
  }
}
