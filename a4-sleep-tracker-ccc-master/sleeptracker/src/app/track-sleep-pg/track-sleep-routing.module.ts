import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackSleepPage } from './track-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: TrackSleepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackSleepPageRoutingModule {}
