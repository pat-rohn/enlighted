import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings'
import { LocalstorageService } from '../localstorage.service'

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent implements OnInit {
  settings?: Settings;
  constructor(private localStorage: LocalstorageService) { }
  
  async ngOnInit() {
    console.log("init view comp");
    this.settings = await this.localStorage.getSettings();
  }

  async clickedCheckConnection() {
  }

  async clickedSave() {
    this.localStorage.setSettings(this.settings);
  }
}
