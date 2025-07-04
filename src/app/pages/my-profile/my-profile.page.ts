import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Input ,Output,EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  standalone:false,
  styleUrls: ['./my-profile.page.scss'],
  // imports:[IonicModule,]
})
export class MyProfilePage implements OnInit {
  @Input() formData: any;
  proData:any;
  profilePage:FormGroup;
  user_id!: number;
  empProfileOptions:any[]=[];
  industryTypeOptions: any[] = [];
  stateOptions: any[] = [];
  cityOptions: any[] = [];

  city: string = '';
  // isProfileIncomplete = true; // Later you can fetch real value from backend
  // showLogoUpload = false;
  // showOfficeUpload = false;

  showLogoUploadSection: boolean = false;
showOfficeUploadSection: boolean = false;

logoUploaded: boolean = false;
officeImagesUploaded: boolean = false;

get isProfileIncomplete(): boolean {
  return !this.logoUploaded || !this.officeImagesUploaded;
}
get isLogoAlready():boolean{
  return !this.logoUploaded;
}
get isOfficeimagesAlready():boolean {
  return !this.officeImagesUploaded;
}

selectedLogo!: File;

officeImagesPreview: string[]=[] ;

  logoPreview: string | ArrayBuffer | null = null;
  officeImages: File[] = [];


  constructor(private fb: FormBuilder,private apiService: ApiService,private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer) {
     {this.profilePage = this.fb.group({

  employer_name: [''],
  email: [''],
  reg_mb: [''],
  contact_person_profile: [''],
  company_name:[''],
  industry_type:[''],
  year_of_establishment:[''],
  comp_size:[''],
  comp_website:[''],
  abt_the_comp:[''],
  full_address:[''],
  state:[''],
  city:[''],
  google_map_loc:[''],
  country:['India']
 
    
        });}
   }

  ngOnInit() {
     this.apiService.getEmpProfile().subscribe((res: any) => {
       if (res.status === 'success') {
         this.empProfileOptions = res.data;
       }
     });
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
     const storedUserId = localStorage.getItem('userId');
     if (storedUserId) {
       this.user_id = parseInt(storedUserId, 10);

     this.apiService.getEmployerProfile(this.user_id).subscribe((res) => {
         if (res.status && res.data) {
           console.log(res);
      if (res.data.company_details.company_images.comp_logo) {
        this.logoUploaded = true;
        this.logoPreview = res.data.company_details.company_images.comp_logo;
        this.showLogoUploadSection = false;
      }
 if (res.data.company_details.company_images.office_img) {
        this.officeImagesUploaded = true;
        this.officeImagesPreview = res.data.company_details.company_images.office_img;
        this.showOfficeUploadSection = false;
      }
          
        // Sanitize the HTML to make it safe for rendering     this.googleMapLoc = this.sanitizer.bypassSecurityTrustHtml(apiGoogleMapLoc);
 
 
          //  this.empProfile=res.data.employer_name;
         this.profilePage.patchValue({
          employer_name:res.data.personal_details.employer_name,
          reg_mb:res.data.personal_details.reg_mb,
         contact_person_profile:res.data.personal_details.contact_person_profile,
         email:res.data.personal_details.email,
         company_name:res.data.company_details.company_name,
         industry_type:res.data.company_details.industry_type,
         year_of_establishment:res.data.company_details.year_of_establishment,
         comp_size:res.data.company_details.comp_size,
         comp_website:res.data.company_details.comp_website,
         abt_the_comp:res.data.company_details.abt_the_comp,
         full_address:res.data.company_details.full_address,
         state:res.data.company_details.state,
         city:res.data.company_details.city,
         google_map_loc:this.sanitizer.bypassSecurityTrustHtml(res.data.company_details.google_map_loc)
         });
         const stateId = res.data.state;
         const cityId = res.data.city;
         this.initializecity(stateId, cityId);
           this.profilePage.disable();
        }

        })
         }
         
  }
  
  initializecity(stateId: number,cityId:number){
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.city = String(cityId); // Reset selected city
          this.profilePage.get('companycity')?.setValue(this.city); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.city = '';
      this.profilePage.get('companycity')?.setValue('');
    }
  }
  // Load cities when a state is selected
  onStateChange(stateId: number) {
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.city = ''; // Reset selected city
          this.profilePage.get('companycity')?.setValue(''); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.city = '';
      this.profilePage.get('companycity')?.setValue('');
    }
  }
  
 showSection(type: 'logo' | 'office') {
  if (type === 'logo') {
    this.showLogoUploadSection = true;
  } else if (type === 'office') {
    this.showOfficeUploadSection = true;
  }
}


onLogoSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedLogo = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


uploadLogo() {
  if (!this.selectedLogo) {
    alert('Please select a logo first');
    return;
  }

  const formData = new FormData();
  formData.append('user_id', this.user_id.toString());
  formData.append('comp_logo', this.selectedLogo);

  this.apiService.upload_company_logo(formData).subscribe({
    next: (res) => {
      alert('Logo uploaded successfully!');
      this.logoUploaded = true;
      this.showLogoUploadSection = false;
    },
    error: (err) => {
      alert('Failed to upload logo.');
      console.error(err);
    }
  });
}



onOfficeImagesSelected(event: any) {
  const files: File[] = Array.from(event.target.files as FileList);
  this.officeImages = files;
  this.officeImagesPreview = [];

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.officeImagesPreview.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}



uploadOfficeImages() {
  if (this.officeImages.length === 0) {
    alert('Please select office images first');
    return;
  }

  const formData = new FormData();
  formData.append('user_id', this.user_id.toString());
  this.officeImages.forEach(file => formData.append('office_images[]', file));

  this.apiService.upload_office_images(formData).subscribe({
    next: (res) => {
      alert('Office images uploaded successfully!');
      this.officeImagesUploaded = true;
      this.showOfficeUploadSection = false;
    },
    error: (err) => {
      alert('Failed to upload office images.');
      console.error(err);
    }
  });
}


}