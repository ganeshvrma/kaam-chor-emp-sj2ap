import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDetailPagePage } from './job-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDetailPagePageRoutingModule {}
