import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationEditorPage } from './location-editor.page';

const routes: Routes = [
  {
    path: '',
    component: LocationEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationEditorPageRoutingModule {}
