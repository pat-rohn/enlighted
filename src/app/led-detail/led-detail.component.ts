import { Component, Input, OnInit } from '@angular/core';

import { LEDStatus } from '../ledstatus';

@Component({
  selector: 'app-led-detail',
  templateUrl: './led-detail.component.html',
  styleUrls: ['./led-detail.component.scss'],
})
export class LedDetailComponent implements OnInit {
  @Input() ledStatus?: LEDStatus;

  constructor() {
  }

  ngOnInit() {
    console.log("msg: " + this.ledStatus.message);
  }

}
