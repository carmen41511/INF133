import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatPgPage } from './stat-pg.page';

const routes: Routes = [
  {
    path: '',
    component: StatPgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatPgPageRoutingModule {}
