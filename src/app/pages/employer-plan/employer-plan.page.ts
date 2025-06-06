import { Component, OnInit } from '@angular/core';
import { IonCol } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PlanCardComponent } from 'src/app/components/plan-card/plan-card.component';
@Component({
  selector: 'app-employer-plan',
  
  templateUrl: './employer-plan.page.html',
  styleUrls: ['./employer-plan.page.scss'],
  standalone: true,
  imports: [

    IonicModule,PlanCardComponent
  ],
})
export class EmployerPlanPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
openSideBar(){
 console.log("shughsaudas");
}

}