import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
 import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-lastpage',
  standalone: false,
  templateUrl: './basic-details-page.page.html',
  styleUrls: ['./basic-details-page.page.scss'],
})
export class BasicDetailsPagePage implements OnInit {
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  basiclast: FormGroup;
  user_id!: number;
  mobileNumber: string = '';
  empProfileOptions: any[] = [];
  emplnumber: string = '';
  empProfile: string = '';
  showOtherInput = false;
  isNewUser: boolean = true;
  selectedSegment: string = 'basic';
  profile_name: string = '';
  //  alertButtons = ['Action'];
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
        private storage: Storage

  ) {
               this.initStorage();

    this.basiclast = this.fb.group({
      emplname: ['', Validators.required],
      emplemail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      contactperson: ['', Validators.required],
      emplnumber: ['', Validators.required],
     profile_name:[]
    });
  }
async initStorage() {
    await this.storage.create();
  }
  async ngOnInit() {
    const info = await Device.getInfo();
    const deviceId = await Device.getId();
    const active = await App.getState();
    const user_id=await this.storage.get('userId');

    const deviceData = {
      device_id: deviceId.identifier,
      // user_id: Number(localStorage.getItem('userId')),
      user_id:user_id,
      device_type: info.operatingSystem,
      last_active: active.isActive,
    };
    console.log(deviceData);
    this.loadEmpProfiles();

    // this.user_id = Number(localStorage.getItem('userId'));
    this.fetchMobileNumber();
    this.checkIfUserExists();
    this.apiService.getDeviceInfo(this.user_id).subscribe((res: any) => {
     
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
  }
  // selectedId?: number
  loadEmpProfiles(selectedId?: number) {
    this.apiService.getEmpProfile().subscribe((res: any) => {
      if (res.status === 'success') {
        this.empProfileOptions = res.data;
     
        if (selectedId) {
      this.basiclast.get('contactperson')?.setValue(selectedId);
      // setTimeout(() => {
      //     this.basiclast.get('contactperson')?.setValue(selectedId);
      //   });
    }
     }
    });
  }



  ionViewWillEnter() {
    this.checkIfUserExists(); // Always check if user already submitted
    this.fetchMobileNumber();
  }

 async fetchMobileNumber() {
    // this.user_id = Number(localStorage.getItem('userId'));
    const user_id=await this.storage.get('userId');

    this.apiService.Getmbbyuserid(this.user_id).subscribe((res) => {
      if (res.status && res.data?.mobile_number) {
        this.mobileNumber = res.data.mobile_number;
        this.basiclast.patchValue({ emplnumber: this.mobileNumber });
      }
    });
  }
  onProfileChange(event: any) {
    const value = event.detail.value;
    this.showOtherInput = value === 'other';
    if (!this.showOtherInput) {
      this.profile_name = '';
    }
  }
  addNewProfile() {
     const trimmedName = this.basiclast.get('profile_name')?.value?.trim();
        // const trimmedName = this.profile_name.trim();
    if (!trimmedName) return;
    // console.log('Calling API with:', trimmedName);
    this.apiService.addEmpProfile({ profile: trimmedName }).subscribe((res: any) => {
      if (res.status === 'success' || res.status === 'exists') {
        // Reload profiles
        const newId = res.insertedId || res.id;   
     
        this.loadEmpProfiles(newId);
         alert('New profile added in dropdown');
        // Set the new option as selected
        // const newId = res.insertedId || res.data?.id;
        // this.basiclast.get('contactperson')?.setValue(newId);

        // this.showOtherInput = false;
        // this.profile_name = '';
      // this.basiclast.get('contactperson')?.setValue(newId);

      this.showOtherInput = false;
      // this.basiclast.get('profile_name')?.reset();
      }
    });
    
  }
  
  
 async checkIfUserExists() {
    // this.user_id = Number(localStorage.getItem('userId'));
    const user_id=await this.storage.get('userId');

    this.apiService.getEmployerData(this.user_id).subscribe(
      (res) => {
        if (res.status && res.data && res.data.employer_name) {
          // ✅ Server confirms user exists
          this.isNewUser = false;
          this.basiclast.patchValue({
            emplname: res.data.employer_name,
            emplnumber: res.data.reg_mb,
            contactperson: res.data.contact_person_profile,
            emplemail: res.data.email,
          });
          this.basiclast.disable();
        } else {
          // ✅ Server says no data: treat as new user
          this.isNewUser = true;
          this.basiclast.enable();
        }
      },
      (error) => {
        console.error('Error checking employer:', error);
        // If 404 or any unexpected error — treat as new user
        this.isNewUser = true;
        this.basiclast.enable();
      }
    );
  }

  validatePhoneNumber(event: any) {
    const input = event.target as HTMLIonInputElement;
    const value = input.value as string;
    const numericValue = value.replace(/\D/g, '');
    this.emplnumber = numericValue.slice(0, 10);
    input.value = this.emplnumber;
  }

  onlyNavigation() {
    this.router.navigate(['/company-details-page']);
  }

  onlyDashboard() {
    this.router.navigate(['/employer-plan']);
  }
 async logout() {
    console.log('Logging out...');
    // localStorage.clear();
    await this.storage.clear();
    this.router.navigate(['/login']);
  }

  submitForm() {
    if (this.basiclast.invalid) {
      this.basiclast.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.basiclast.value,
      user_id: this.user_id,
    };

    console.log('Submitting form:', formData);

    this.apiService.submitBasic(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        localStorage.setItem('basicFormCompleted', 'true');
        this.router.navigate(['/company-details-page']);
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }
}