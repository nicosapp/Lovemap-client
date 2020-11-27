import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadChildren: () =>
          import('../pages/map/map.module').then((m) => m.MapPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('../pages/statistics/statistics.module').then(
            (m) => m.StatisticsPageModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          )
      },
      {
        path: 'friends',
        loadChildren: () =>
          import('../pages/friends/friends.module').then(
            (m) => m.FriendsPageModule
          )
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('../pages/locations/locations.module').then(
            (m) => m.LocationsPageModule
          )
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
