import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from '@ionic/angular';

import { JobDetailPagePageRoutingModule } from './job-detail-page-routing.module';

import { JobDetailPage } from './job-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailPagePageRoutingModule,ReactiveFormsModule,NgSelectModule
  ],
  declarations: [JobDetailPage]
})
export class JobDetailPagePageModule {}
