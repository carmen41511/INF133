import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishLogPgPage } from './finish-log-pg.page';

const routes: Routes = [
  {
    path: '',
    component: FinishLogPgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishLogPgPageRoutingModule {}
