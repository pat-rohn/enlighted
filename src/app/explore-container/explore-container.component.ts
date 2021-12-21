import { Component, OnInit, Input } from '@angular/core';

import { LedcontrolService } from '../ledcontrol.service';
import { LEDStatus } from '../ledstatus';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  led?: LEDStatus;

  constructor(private ledcontrolService: LedcontrolService) { }

  ngOnInit() {
    if (this.name == "LED") {
      this.led = this.ledcontrolService.getLedStatus();
    } else {
      this.led = null;
    }

  }

}
