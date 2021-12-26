import { Component, OnInit } from '@angular/core';

import { LedcontrolService } from '../ledcontrol.service';
import { LEDStatus, LEDMode, LabeledLedMode, LED_ON, LED_OFF, LED_PULSE, LED_CAMPFIRE, LED_COLORS, LED_AUTOCHANGE } from '../ledstatus';


@Component({
  selector: 'app-led-detail',
  templateUrl: './led-detail.component.html',
  styleUrls: ['./led-detail.component.scss'],
})
export class LedDetailComponent implements OnInit {
  ledStatus?: LEDStatus;
  ledModes: LabeledLedMode[] = [
    LED_ON,
    LED_OFF,
    LED_CAMPFIRE,
    LED_COLORS,
    LED_AUTOCHANGE,
    LED_PULSE,
  ];


  constructor(private ledcontrolService: LedcontrolService) {
  }

  ngOnInit() {
    this.ledcontrolService.getLedStatus()
      .subscribe(ledstatus => this.ledStatus = ledstatus);
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

  onSelectChange(event: any): void {
    console.log("ion change");
    console.log(event.target.value);
    if (this.ledStatus) {
      console.log("change mode");
      this.ledStatus.mode = event.target.value.mode;
      this.ledcontrolService.saveStatus(this.ledStatus)
      .subscribe(() => console.log("save led detail component: select"));
    }
  }

  onSave(): void {
    if (this.ledStatus) {
      this.ledcontrolService.saveStatus(this.ledStatus)
      .subscribe(() => console.log("save led detail component: save"));
    }
  }

  onOff(): void {
    if (this.ledStatus) {
      this.ledStatus.mode = LED_OFF;
      this.ledcontrolService.saveStatus(this.ledStatus)
        .subscribe(() => console.log("save led detail component: off"));
    }
  }
  onRefresh() {
    this.ledcontrolService.getLedStatus()
      .subscribe(ledstatus => this.ledStatus = ledstatus);
  }

  compareFn(e1: LabeledLedMode, e2: LabeledLedMode): boolean {
    //console.log("compareFn " + e1.mode + " : " + e2.mode + " / " + e1.label + ": " + e2.label);
    console.log("e2 " + e2.id);
    console.log("e1 " + e1.id);
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

}
