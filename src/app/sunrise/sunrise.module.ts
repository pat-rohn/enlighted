import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunriseComponent } from './sunrise.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [SunriseComponent],
  exports: [SunriseComponent]
})
export class SunriseModule { }
