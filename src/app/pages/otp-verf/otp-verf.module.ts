import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OtpInputComponent } from 'src/app/components/otp-input/otp-input.component';

import { OtpVerfPageRoutingModule } from './otp-verf-routing.module';

import { OtpVerfPage } from './otp-verf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVerfPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [OtpVerfPage]
})
export class OtpVerfPageModule {}
