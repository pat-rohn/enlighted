import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LedDetailComponent } from './led-detail.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [LedDetailComponent],
    exports: [LedDetailComponent]
})
export class LedDetailComponentModule { }
