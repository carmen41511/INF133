import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackSleepPageRoutingModule } from './track-sleep-routing.module';

import { TrackSleepPage } from './track-sleep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackSleepPageRoutingModule
  ],
  declarations: [TrackSleepPage]
})
export class TrackSleepPageModule {}
