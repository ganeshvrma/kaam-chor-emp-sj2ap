// import { ModalController, NavParams } from '@ionic/angular';
// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// @Component({
//   selector: 'app-checkout-modal',
//   templateUrl: './checkout-modal.page.html',
//   styleUrls: ['./checkout-modal.page.scss'],
//   imports:[IonicModule],
// })
// export class CheckoutModalPage {
//   plan: any;

//   constructor(private modalCtrl: ModalController, private navParams: NavParams) {
//     this.plan = this.navParams.get('plan');
//   }

//   dismiss() {
//     this.modalCtrl.dismiss();
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout-modal',
  standalone:true,
  templateUrl: './checkout-modal.page.html',
  styleUrls: ['./checkout-modal.page.scss'],
  imports:[IonicModule,ReactiveFormsModule,FormsModule,CommonModule]
})
export class CheckoutModalPage implements OnInit {
  plan: any;
   checkOutData:FormGroup;
    user_id!: number;
    number: string = '';
  address: string = '';
  name:string='';
  email:string='';
  Razorpay: any;
  constructor( private navParams: NavParams, 
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private apiService: ApiService,
  ) 
  {
    this.plan = this.navParams.get('plan');

    this.checkOutData=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      address:['',Validators.required]

    })
  }
 ngOnInit(){
   this.user_id = Number(localStorage.getItem('userId'));
   this.plan = this.navParams.get('plan');
  //  console.log(this.plan);
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  onPayNow(){
     if (this.checkOutData.invalid) {
      this.checkOutData.markAllAsTouched();
      return;
    }
    const formData = {
      ...this.checkOutData.value,
      user_id: this.user_id,
    };
   this.apiService.submitCheckoutData(formData).subscribe((res: any) => {
        if (res.status === "success") {
        console.log(res);
       
      // var  planDuration=this.plan.duration;

      // console.log(planDuration);
        // this.apiService.orderCreate(planDuration).subscribe((res:any)=>{

        // })

      var  planPrice=this.plan.price;
          
      this.apiService.orderCreate(planPrice).subscribe((order: any) => {
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "SURYA JOBS (OPC) PRIVATE LIMITED",
        description: "Test Transaction",
        image: "https://staging.ekarigar.com/kaam-chor/images/logo-transparent.svg",
        order_id: order.order_id,
        handler: (response: any) => {
          // verify payment at backend
             const verifyPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount:options.amount,
            user_id:this.user_id,

          };
          this.apiService.verifyPayment(verifyPayload).subscribe((res: any) => {
            if (res.status === 'success') {
              alert("Payment Successful ✅");
            } else {
              alert("Payment Failed ❌");
            }
          });
        },
        prefill: {
          name: res.data.name,
          email: res.data.email,
          contact: res.data.mobile
        },
        theme: { color: "#511168" }
      };
 
      const rzp1 = new Razorpay(options);
      rzp1.open();
    });
  



        }
      });
  }
  
//  paytesting(){
//        this.user_id= Number(localStorage.getItem('userId'));
//      var  planPrice=this.plan?.price;
//      this.apiService.orderCreate(planPrice).subscribe((order: any) => {
//       const options = {
//         key: order.key,
//         amount: order.amount,
//         currency: order.currency,
//         name: "SURYA JOBS (OPC) PRIVATE LIMITED",
//         description: "Test Transaction",
//         order_id: order.order_id,
//         handler: (response: any) => {
//           // verify payment at backend
//            const verifyPayload = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//             amount:options.amount,
//             user_id:this.user_id,

//           };
//           this.apiService.verifyPayment(verifyPayload).subscribe((res: any) => {
//             if (res.status === 'success') {
//               alert("Payment Successful ✅");
//             } else {
//               alert("Payment Failed ❌");
//             }
//           });
//         },
//         prefill: {
//           name: "Test User",
//           email: "test@example.com",
//           contact: "9999999999"
//         },
//         theme: { color: "#3399cc" }
//       };
 
//       const rzp = new Razorpay(options);
//       rzp.open();
//     });
  
//  }
}