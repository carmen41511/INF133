import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatPgPageRoutingModule } from './stat-pg-routing.module';

import { StatPgPage } from './stat-pg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatPgPageRoutingModule
  ],
  declarations: [StatPgPage]
})
export class StatPgPageModule {}
