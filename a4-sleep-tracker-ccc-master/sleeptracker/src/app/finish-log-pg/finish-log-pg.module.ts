import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishLogPgPageRoutingModule } from './finish-log-pg-routing.module';

import { FinishLogPgPage } from './finish-log-pg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishLogPgPageRoutingModule
  ],
  declarations: [FinishLogPgPage]
})
export class FinishLogPgPageModule {}
