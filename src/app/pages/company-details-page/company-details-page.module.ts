import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyDetailsPagePageRoutingModule } from './company-details-page-routing.module';

import { CompanyDetailsPagePage } from './company-details-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyDetailsPagePageRoutingModule
  ],
  declarations: []
})
export class CompanyDetailsPagePageModule {}
