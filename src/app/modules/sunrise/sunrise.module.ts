import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunriseComponent } from './sunrise.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SunriseComponent],
  exports: [SunriseComponent]
})
export class SunriseModule { }
