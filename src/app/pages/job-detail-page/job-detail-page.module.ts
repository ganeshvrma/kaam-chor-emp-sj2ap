import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDetailPagePageRoutingModule } from './job-detail-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { JobDetailPage } from './job-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [JobDetailPage]
})
export class JobDetailPagePageModule {}
