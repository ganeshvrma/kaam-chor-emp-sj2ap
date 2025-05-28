import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicDetailsPagePage } from './basic-details-page.page';

const routes: Routes = [
  {
    path: '',
    component: BasicDetailsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicDetailsPagePageRoutingModule {}
