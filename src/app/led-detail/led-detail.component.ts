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
    console.log("msg: " + this.ledStatus.message);
  }

}
