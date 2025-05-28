import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailsPagePage } from './company-details-page.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDetailsPagePageRoutingModule {}
