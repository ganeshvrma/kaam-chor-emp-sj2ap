import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lastpage',
  standalone:false,
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
  isNewUser: boolean = true;
  selectedSegment: string = 'basic';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.basiclast = this.fb.group({
      emplname: ['', Validators.required],
      emplemail: ['', Validators.compose([Validators.required, Validators.email])],
      contactperson: ['', Validators.required],
      emplnumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apiService.getEmpProfile().subscribe((res: any) => {
      if (res.status === 'success') {
        this.empProfileOptions = res.data;
      }
    });
    this.user_id = Number(localStorage.getItem('userId'));
    this.fetchMobileNumber();
    this.checkIfUserExists();
  }

  ionViewDidEnter() {
    this.checkIfUserExists(); // Always check if user already submitted
  }

  fetchMobileNumber() {
    this.apiService.Getmbbyuserid(this.user_id).subscribe((res) => {
      if (res.status && res.data?.mobile_number) {
        this.mobileNumber = res.data.mobile_number;
        this.basiclast.patchValue({ emplnumber: this.mobileNumber });
      }
    });
  }

  checkIfUserExists() {
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
