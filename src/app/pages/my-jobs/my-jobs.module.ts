import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyJobsPageRoutingModule } from './my-jobs-routing.module';

import { MyJobsPage } from './my-jobs.page';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyJobsPageRoutingModule,SidebarComponent
  ],
  declarations: [MyJobsPage]
})
export class MyJobsPageModule {}
