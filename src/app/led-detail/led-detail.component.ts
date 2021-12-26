import { Component, OnInit } from '@angular/core';

import { LedcontrolService } from '../ledcontrol.service';
import { LEDStatus } from '../ledstatus';


@Component({
  selector: 'app-led-detail',
  templateUrl: './led-detail.component.html',
  styleUrls: ['./led-detail.component.scss'],
})
export class LedDetailComponent implements OnInit {
  ledStatus?: LEDStatus;

  constructor(private ledcontrolService: LedcontrolService) {
  }

  ngOnInit() {
    this.ledcontrolService.getLedStatus()
      .subscribe(ledstatus => this.ledStatus = ledstatus);

    //console.log("msg: " + this.ledStatus.message);
  }
  
  formatSlider(value: number) {
    return value + "%";
  }

  sliderBrightnessOnChange(value: number){
    console.log("brightness: " + value);
    if (this.ledStatus != null)
    {
      this.ledStatus.brightness = value;
      this.onSave();
    }
  }

  sliderRedOnChange(value: number){
    console.log("red: " + value);
    if (this.ledStatus != null)
    {
      this.ledStatus.red = value;
      this.onSave();
    }
  }

  sliderGreenOnChange(value: number){
    console.log("green: " + value);
    if (this.ledStatus != null)
    {
      this.ledStatus.green = value;
      this.onSave();
    }
  }

  sliderBlueOnChange(value: number){
    console.log("blue: " + value);
    if (this.ledStatus != null)
    {
      this.ledStatus.blue = value;
      this.onSave();
    }
  }

  onRefresh(){
    this.ledcontrolService.getLedStatus()
      .subscribe(ledstatus => this.ledStatus = ledstatus);

  }

  onSave(): void {
    if (this.ledStatus) {
      this.ledcontrolService.saveStatus(this.ledStatus)
        .subscribe(() => console.log("led detail component: saved status"));
    }
  }

  onOff(): void {
    if (this.ledStatus) {
      this.ledStatus.mode = "off";
      this.ledcontrolService.saveStatus(this.ledStatus)
        .subscribe(() => console.log("led detail component: saved status"));
    }
  }
}
