import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'track-sleep',
    loadChildren: () => import('./track-sleep-pg/track-sleep.module').then( m => m.TrackSleepPageModule)
  },
  {
    path: 'stat-pg',
    loadChildren: () => import('./stat-pg/stat-pg.module').then( m => m.StatPgPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
