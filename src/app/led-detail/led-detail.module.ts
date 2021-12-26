import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';

import { LedDetailComponent } from './led-detail.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, MatSliderModule, MatButtonModule],
    declarations: [LedDetailComponent],
    exports: [LedDetailComponent]
})
export class LedDetailComponentModule { }
