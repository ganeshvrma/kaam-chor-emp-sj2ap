import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-employer-plan',

  templateUrl: './employer-plan.page.html',
  styleUrls: ['./employer-plan.page.scss'],
  standalone: false,
})
export class EmployerPlanPage implements OnInit {
  userType: string | null = null;
user_id!:number;
  plans: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {}

  async openCheckoutModal(plan: any) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModalPage,
      componentProps: { plan },
    });
    await modal.present();
  }

   async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.userType = navigation.extras.state['userType'];
    }
    this.userType=localStorage.getItem('type_Of_User');
  
    console.log("from local storage",this.userType);

    if (this.userType === 'existing') {
      this.apiService.getEmployerPlans().subscribe((res: any) => {
        if (res.status === true) {
          this.plans = res.data;
        }
      });
    }

    //device information
    const info = await Device.getInfo();
     const deviceId = await Device.getId();
     const active = await App.getState();
     const deviceData = {
    device_id: deviceId.identifier ,
    user_id: Number(localStorage.getItem('userId')),
   
    device_type: info.operatingSystem,
    last_active:  active.isActive
  };
   this.user_id= Number(localStorage.getItem('userId')),

   this.apiService.getDeviceInfo(this.user_id).subscribe((res: any) => {
      if (res.status === true) {
      console.log( res.data);
      }
      else{
        this.apiService.postDeviceInfo(deviceData).subscribe(
    (res: any) => {
      console.log('Device info posted:', res);
    },
    (err:any) => {
      console.error('Failed to post device info:', err);
    }
  );
      }
    });

  //device end
  }
  logout() {
    // Step 1: Clear the user_id from localStorage
    localStorage.removeItem('user_id');

    // OR reset completely
    localStorage.clear(); // if you want to clear everything

    // Step 2: Navigate to the login page
    this.router.navigate(['/login']);
  }
}

// plans = [
//     {
//       title: '1 month PLAN',

//       price: 1999,
//       des:"Unlimited Candidate Responses",
//       duration: '1 month',
//       unlocks: 200,
//       jobs: 15,
//       boosts: 2,
//     },

//    ];