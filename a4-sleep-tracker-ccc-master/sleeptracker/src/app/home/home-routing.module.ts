import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  // {
  //   path: 'tab',
  //   loadChildren: () => import('.').then( m => m.TabPageModule)
  // },
  // {
  //   path: 'tab-sleepiness',
  //   loadChildren: () => import('./tab-sleepiness/tab-sleepiness.module').then( m => m.TabSleepinessPageModule)
  // },
  // {
  //   path: 'tab-stat',
  //   loadChildren: () => import('./tab-stat/tab-stat.module').then( m => m.TabStatPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
