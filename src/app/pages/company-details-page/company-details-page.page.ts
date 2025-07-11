import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LocalStorageUtil } from 'src/app/shared/utils/localStorageUtil';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mainfirst',
  standalone: false,
  templateUrl: './company-details-page.page.html',
  styleUrls: ['./company-details-page.page.scss'],
})
export class CompanyDetailsPagePage implements OnInit {
  @Input() formData: any;
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  company: FormGroup;
  //get api
  industryTypeOptions: any[] = [];
  selectedIndustryType: string = '';
user_id!: number;
  stateOptions: any[] = [];
  selectedState: string = '';
 selectedSegment: string = 'company';

  cityOptions: any[] = [];
  companycity: string = '';
isNewUser: boolean = true;
  //
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    {
      this.company = this.fb.group({
        companyname: ['', Validators.required],
        companyaddress: ['', Validators.required],
        companystate: ['', Validators.required],
        companycity: ['', Validators.required],
        google_map_loc: [''],
        companycountry: ['India', Validators.required],
        companywebsite: [''],
        companydesc: [''],
        industrytype: ['', Validators.required],
        numemployees: [''],
        companyestb: [''],
      });
    }
  }

  ngOnInit() {
    this.apiService.getIndustryType().subscribe((res: any) => {
      if (res.status === 'success') {
        this.industryTypeOptions = res.data;
      }
    });
    this.apiService.getStates().subscribe((res: any) => {
      if (res.status === 'success') {
        this.stateOptions = res.data;
      }
    });
//      this.user_id=Number(localStorage.getItem('userId'));
//          this.apiService.getEmployerCompanyData(this.user_id).subscribe((res) => {
//          if (res.status && res.data) {
//            console.log(res);

//         this.isNewUser = false;
          
//          this.company.patchValue({
//           companyname:res.data.company_name,
//           companyaddress:res.data.full_address,
//          companystate:res.data.state,
//          companycity:res.data.city,
//          google_map_loc:this.sanitizer.bypassSecurityTrustHtml(res.data.google_map_loc),
//          companywebsite:res.data.comp_website,
//          companydesc:res.data.abt_the_comp,
//          industrytype:res.data.industry_type,
//          numemployees:res.data.comp_size,
//          companyestb:res.data.year_of_establishment,
//          });
//          const stateId = res.data.state;
//          const cityId = res.data.city;
//          this.initializecity(stateId, cityId);
// this.company.disable();
         
//          }
//          else {
//         // If no data, treat as new user
//         this.isNewUser = false;
//          }
//         });
        this.user_id=Number(localStorage.getItem('userId'));

    this.getEmployerdata();
  }
  ionViewDidEnter(){
      this.getEmployerdata();
    }
 getEmployerdata(){
  // const storedUserId=LocalStorageUtil.getItem('userId');
      // const formCompleted = localStorage.getItem('company_complete') === 'true';
      // const user_type = localStorage.getItem('type_Of_User') === 'existing';

    // if(storedUserId){
      // this.user_id = parseInt(storedUserId, 10);
        // if (formCompleted||user_type) {
       
        // this.user_id=Number(localStorage.getItem('userId'));
         this.apiService.getEmployerCompanyData(this.user_id).subscribe((res) => {
         if (res.status && res.data) {
           console.log(res);

        this.isNewUser = false;
          
         this.company.patchValue({
          companyname:res.data.company_name,
          companyaddress:res.data.full_address,
         companystate:res.data.state,
         companycity:res.data.city,
         google_map_loc:this.sanitizer.bypassSecurityTrustHtml(res.data.google_map_loc),
         companywebsite:res.data.comp_website,
         companydesc:res.data.abt_the_comp,
         industrytype:res.data.industry_type,
         numemployees:res.data.comp_size,
         companyestb:res.data.year_of_establishment,
         });
         const stateId = res.data.state;
         const cityId = res.data.city;
         this.initializecity(stateId, cityId);
this.company.disable();
         
         }
         else {
        // If no data, treat as new user
        this.isNewUser = true;
this.company.enable();

         }
        });
        // this.company.disable();
        return;
      // }
      this.isNewUser=false;
     
    // }
 }
  showTutorial = false;
  openTutorial() {
    this.showTutorial = true;
  }
  closeTutorial() {
    this.showTutorial = false;
  }

  initializecity(stateId: number,cityId:number){
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.companycity = String(cityId); // Reset selected city
          this.company.get('companycity')?.setValue(this.companycity); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.companycity = '';
      this.company.get('companycity')?.setValue('');
    }
  }
  // Load cities when a state is selected
  onStateChange(stateId: number) {
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.companycity = ''; // Reset selected city
          this.company.get('companycity')?.setValue(''); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.companycity = '';
      this.company.get('companycity')?.setValue('');
    }
  }
basicpg(){
  this.router.navigate(['/basic-details-page']);
}
  // nextStep2() {
  //   if (this.company.valid) {
  //     console.log('Form data:', this.company.value);
     
  //   } else {
  //     this.company.markAllAsTouched();
  //     console.log('Form is invalid');
  //   }
  // }
  //

  onlyNavigate() {
    this.router.navigate(['/job-detail-page']);
  }
  previousPage() {
    this.router.navigate(['/basic-details-page']);
  }

  submitForm() {
    if (this.company.invalid) {
      this.company.markAllAsTouched(); // Show validation errors
      return;
    }

    // const formData = this.jobForm.value;
    const formData = {
      ...this.company.value,
      // step_two_data: "step 2", // replace with actual step one form/control or object
      user_id: LocalStorageUtil.getItem('userId'),
    };

    console.log('Submitting form:', formData);

    // Call your API service here
    this.apiService.submitCompany(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        // Show success toast or redirect
        localStorage.setItem('company_complete','true');
        this.router.navigate(['/job-detail-page']);
      },
      (error: any) => {
        console.error('API Error:', error);
        // Show error toast
      }
    );
  }
}