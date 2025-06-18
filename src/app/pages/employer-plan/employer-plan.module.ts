// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// import { IonicModule } from '@ionic/angular';

// import { EmployerPlanPageRoutingModule } from './employer-plan-routing.module';
// import { PlanCardComponent } from '../../components/plan-card/plan-card.component';

// import { EmployerPlanPage } from './employer-plan.page';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     EmployerPlanPageRoutingModule,PlanCardComponent,EmployerPlanPage
//   ],
  
//   declarations: [],
  
// })
// export class EmployerPlanPageModule {}
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { EmployerPlanPageRoutingModule } from './employer-plan-routing.module';
import { EmployerPlanPage } from './employer-plan.page';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PlanCardComponent } from 'src/app/components/plan-card/plan-card.component';

@NgModule({
  declarations: [EmployerPlanPage
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPlanPageRoutingModule,CheckoutModalPage,RouterLinkActive,RouterLink,PlanCardComponent
  ],
  // entryComponents: [CheckoutModalPage] // Required for modals
})
export class EmployerPlanPageModule {}