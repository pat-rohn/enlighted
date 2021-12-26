import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatSliderModule} from '@angular/material/slider';

import { LedDetailComponent } from './led-detail.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, MatSliderModule],
    declarations: [LedDetailComponent],
    exports: [LedDetailComponent]
})
export class LedDetailComponentModule { }
