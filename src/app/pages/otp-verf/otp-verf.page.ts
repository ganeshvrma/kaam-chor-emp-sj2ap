import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';
import { AlertController, IonicModule, NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-otp-verf',
  standalone:false,
  templateUrl: './otp-verf.page.html',
  styleUrls: ['./otp-verf.page.scss'],
  //  imports: [CommonModule, IonicModule,ReactiveFormsModule,FormsModule] ,
})
export class OtpVerfPage implements OnInit {
  mobileNumber: string = '';
  otp: string = '';
  username: string = '';
  isLoading: boolean = false;
  isNewUser: boolean = false;
  // isNewUser: boolean | undefined;
userType:string='';
backButtonSub: Subscription | undefined;
  isAlertPresented: boolean = false;

  // Define your route restrictions here
  restrictedRoutes: string[] = [ '/otp-verf'];
  confirmRoutes: string[] = ['/employer-plan', '/basic-details-page'];
  constructor(private navCtrl: NavController,
     private platform: Platform,private router: Router,private route: ActivatedRoute,private authService: AuthService,
     
    private alertCtrl: AlertController,) { }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
      // Set the status bar style to dark (black text/icons)
      StatusBar.setStyle({ style: StatusBarStyle.Dark });
    // console.log(this.isNewUser);
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mobileNumber = navigation.extras.state['mobileNumber'];
      this.isNewUser = navigation.extras.state['isNewUser'];
      this.username = navigation.extras.state['username'];
    }
    this.handleBackButton();
  }

  submitOtp(){
    console.log('Attempting navigation to /tabs/home');
  this.router.navigate(['/job-detail-page']).then(
    () => console.log('Navigation successful'),
    (err) => console.error('Navigation failed', err)
  );
  }

  verifyOtp() {
    if (this.otp.length === 4 && !this.isLoading) {
      this.isLoading = true;
      console.log('Verifying OTP:', this.otp);

      this.authService.verifyOtp(this.mobileNumber, this.otp).subscribe({
        next: (response) => {
          console.log('OTP verified successfully', response);
          this.isLoading = false;

          //set localstorage is loggedin 
          // Set localStorage indicator for login
          console.log('userid',response.data.user_id);
          this.userType=response.data.user_type;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('type_Of_User',response.data.user_type);
          localStorage.setItem('userId', response.data.user_id.toString());

        //   this.formDataService.getFormData(this.userId).subscribe(data => {
        //     this.formDataService.setFormData(data); // Prefill the form data
        //     this.router.navigate(['/step-one']); // Navigate to the first step
        // });
          //  const userId=response.data.user_id;
          const navigationExtras: NavigationExtras = {
            state: {
              verified: true,
            //  userId:userId
            userType:this.userType
            }
          };

          
          // if(this.isNewUser){
          // localStorage.setItem('userId', response.data.user_id.toString());

          //   this.router.navigate(['/basic-details-page'], navigationExtras);
          // }else{
          //   this.router.navigate(['/employer-plan'], navigationExtras);
          // }
          if(this.userType==="new"){
          localStorage.setItem('userId', response.data.user_id.toString());

            this.router.navigate(['/basic-details-page'], navigationExtras);
          }else{
            this.router.navigate(['/employer-plan'], navigationExtras);
          }
         
        },
        error: (error) => {
          console.error('Error verifying OTP', error);
          this.isLoading = false;
          console.log(error.error.data.message);
          // Handle error (e.g., show error message to user)
          // You might want to use a toast or alert to inform the user
        }
      });
    } else {
      console.error('Invalid OTP or already processing');
      // Optionally, inform the user about the invalid submission
    }
  }

  goBack(){
    // this.navCtrl.back();
    //handle hardware back button navigation
    // this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/otp-verf']);
      // this.navCtrl.back();
    // });
  }

  otpArray: string[] = ['', '', '', ''];
// otp: string = '';

onOtpChange(event: any, index: number) {
  const input = event.target as HTMLIonInputElement;
  const value = input.value as string;

  if (/^\d$/.test(value)) {
    this.otpArray[index] = value;
    this.otp = this.otpArray.join('');
    if (index < 3) {
      const nextInput = document.getElementById('otp-' + (index + 1)) as HTMLIonInputElement;
      if (nextInput) nextInput.setFocus();
    } else {
      input.getInputElement().then(native => native.blur());
    }
  }
}

onKeyDown(event: KeyboardEvent, index: number) {
  const input = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && !input.value && index > 0) {
    const prevInput = document.getElementById('otp-' + (index - 1)) as HTMLIonInputElement;
    if (prevInput) prevInput.setFocus();
    this.otpArray[index] = '';
    this.otp = this.otpArray.join('');
  }
}

//handle hardware back button 
 async handleBackButton() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(9999, async () => {
      const currentUrl = this.router.url.split('?')[0];

      // Block back navigation on restricted routes
      if (this.restrictedRoutes.includes(currentUrl)) {
        return;
      }

      // Show confirmation alert on specific routes
      if (this.confirmRoutes.includes(currentUrl)) {
        if (this.isAlertPresented) return;

        this.isAlertPresented = true;
        const alert = await this.alertCtrl.create({
          header: 'Confirm',
          message: 'Are you sure you want to go back to the homepage? Unsaved changes may be lost.',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                this.isAlertPresented = false;
              },
            },
            {
              text: 'Confirm',
              handler: () => {
                this.isAlertPresented = false;
                this.navCtrl.navigateRoot('/employer-plan');
              },
            },
          ],
        });

        await alert.present();
      } else {
        // Allow normal back navigation
        this.navCtrl.back();
      }
    });
  }

  ngOnDestroy() {
    if (this.backButtonSub) {
      this.backButtonSub.unsubscribe();
    }
  }


}