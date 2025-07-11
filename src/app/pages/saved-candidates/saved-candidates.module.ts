import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedCandidatesPageRoutingModule } from './saved-candidates-routing.module';

import { SavedCandidatesPage } from './saved-candidates.page';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedCandidatesPageRoutingModule,SidebarComponent
  ],
  declarations: [SavedCandidatesPage]
})
export class SavedCandidatesPageModule {}