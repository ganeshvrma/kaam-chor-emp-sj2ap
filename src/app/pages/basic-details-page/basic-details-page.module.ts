import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicDetailsPagePageRoutingModule } from './basic-details-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { BasicDetailsPagePage } from './basic-details-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicDetailsPagePageRoutingModule,ReactiveFormsModule
  ],
  declarations: [BasicDetailsPagePage]
})
export class BasicDetailsPagePageModule {}
