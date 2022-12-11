import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsViewComponent } from './settings-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SettingsViewComponent],
  exports: [SettingsViewComponent]
})
export class SettingsViewModule { }
