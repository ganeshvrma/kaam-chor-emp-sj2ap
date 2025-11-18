import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Storage } from '@ionic/storage-angular';

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
 savedCandidates!:number;
 activejobs!:number;
 duration!:string ;
 prevduration!:string;
 prevplanExpiryDate:string |null=null;
 planAmount!:number;
 planJobslive!:number;
 planUnlock!:number;
 jobs_boost!:number;
 planExpiryDate:string |null=null;
//  planStatus:string |null =null;
 planStatus!:string;

 previousPlan!:boolean;
  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private router: Router,
    private storage: Storage
  ) {
     this.initStorage();
  }
 async initStorage() {
    await this.storage.create();
  }
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
    // this.userType=localStorage.getItem('type_Of_User');
    this.userType=await this.storage.get('type_Of_User');
    // console.log("from local storage",this.userType);

    // if (this.userType === 'existing') {
      this.apiService.getEmployerPlans().subscribe((res: any) => {
        if (res.status === true) {
          this.plans = res.data;
        }
      });
    // }

    //device information
    const info = await Device.getInfo();
     const deviceId = await Device.getId();
     const active = await App.getState();
     const deviceData = {
    device_id: deviceId.identifier ,
    // user_id: Number(localStorage.getItem('userId')),
      user_id:await this.storage.get('userId'),
   
    device_type: info.operatingSystem,
    last_active:  active.isActive
  };
  //  this.user_id= Number(localStorage.getItem('userId')),
      this.user_id=await this.storage.get('userId'),
   
   this.apiService.getDeviceInfo(this.user_id).subscribe((res: any) => {
  //     if (res.status === true) {
  //     console.log( "Device info already exist");
  //     }
  //     else{
  //       this.apiService.postDeviceInfo(deviceData).subscribe(
  //   (res: any) => {
  //     console.log('Device info posted:', res);
  //   },
  //   (err:any) => {
  //     console.error('Failed to post device info:', err);
  //   }
  // );
  //     }
    
    if (res.status === true) {
      console.log( "Device info already exist");
      }
    
    },
    (error)=>
    this.apiService.postDeviceInfo(deviceData).subscribe(
    (res: any) => {
      console.log('Device info posted:', res);
    },
    (err:any) => {
      console.error('Failed to post device info:', err);
    }
  )
    );



    // count saved candidates
     this.apiService.CountSavedcandidates(this.user_id).subscribe((res:any)=>{
      if(res.status==="success"){
        console.log(res.data);
         this.savedCandidates=res.data;
      }
     });
     this.prevPlanStatus();
     // to show active jobs in 
      this.currentActiveJobs();
     // to show active plan status 
      this.planCurrentStatus();

        this.apiService.checkPlanTaken(this.user_id).subscribe((res: any) => {
        if (res.status === true) {
         
          console.log("plan fdhf");
        }
        
      });

  }
  //previous plan status
  prevPlanStatus(){
    this.apiService.previousPlanStatus(this.user_id).subscribe((res:any)=>{
      if(res.status==="success"){
         this.prevduration=res.data.duration;
         this.prevplanExpiryDate=res.data.expiry_date;
         this.previousPlan=true;
      }
    })
  }
   // to show active plan status
  planCurrentStatus(){
    
     this.apiService.activePlanStatus(this.user_id).subscribe((res:any)=>{
      if(res.status==="success"){
        // console.log(res.data);
         this.duration=res.data.duration;
         this.planExpiryDate=res.data.expiry_date;
         this.planAmount=res.data.plan_amt;
         this.planUnlock=res.data.plan_unlock;
         this.planJobslive=res.data.jobs_live;
         this.jobs_boost=res.data.jobs_boost;
         this.planStatus="paid";
      }
    
     });
  }
  currentActiveJobs(){
     this.apiService.CountActiveJobs(this.user_id).subscribe((res:any)=>{
      if(res.status==="success"){
        // console.log(res.data);
         this.activejobs=res.data;
         this.planStatus="paid";
      }
     });
  }
  ionViewDidEnter(){
    //checking condition every time
      this.apiService.checkPlanTaken(this.user_id).subscribe((res: any) => {
        if (res.status === true) {
          console.log("plan  activated ");
        }
       });
        this.prevPlanStatus();
       // to show active plan status
       this.planCurrentStatus();
       // to show active jobs in 
       this.currentActiveJobs();
  }
async  logout() {
    // Step 1: Clear the user_id from localStorage
    // localStorage.removeItem('user_id');
 await this.storage.clear();
     await this.storage.remove('userId');

    // OR reset completely
    // localStorage.clear(); // if you want to clear everything

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