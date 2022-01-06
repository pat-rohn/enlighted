import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

import { LedDetailComponent } from './led-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    imports: [CommonModule,
        FormsModule,
        IonicModule,
        MatSliderModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule],
    declarations: [LedDetailComponent],
    exports: [LedDetailComponent]
})
export class LedDetailComponentModule { }
