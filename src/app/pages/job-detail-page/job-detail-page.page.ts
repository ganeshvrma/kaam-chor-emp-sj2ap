import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageUtil } from 'src/app/shared/utils/localStorageUtil';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail-page',
  standalone: false,
  templateUrl: './job-detail-page.page.html',
  styleUrls: ['./job-detail-page.page.scss'],
})
export class JobDetailPage implements OnInit {
  languageControl = new FormControl();
  // selectedLanguage: any;
  // selectedLanguage2: any;
  // selectedJob:any;
  @Input() formData: any;
  @Output() submit = new EventEmitter<void>();

  form = {
    description: '',
  };
  city: string | undefined;
  company_id: string | undefined;
  state: string | undefined;
  dropdownOptions: any[] = [];
  perksOptions:any[]=[];
  languageOptions: any[] = [];
  selectedSkills: any[] = [];
   showStartPicker = false;
  showEndPicker = false;
  time:any;
  qualification: any[] = [];
  // branch:any[]=[];
  jobForm: FormGroup;
  isRecreate: boolean = false;
  years: number[] = [];
  selectedQualifications: string = '';
  // selectedBranch:string='';
 selectedSegment: string = 'job';

  // Radio/select controls holders
  WorkFromHome: string = '';
  isgender: string = '';
  jobType: string = '';
   perks:string='';
  issecuritygiven: string = '';
  candidatetype: string = '';
  selectedLocation: string = '';

  locations: string[] = [
    'Within 10 KM of my city',
    'Within my city',
    'Anywhere in India',
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.years = Array.from({ length: 29 }, (_, i) => i + 1);
    this.jobForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      jobCategory: ['', Validators.required],
      jobType: ['', Validators.required],
      positionsOpen: ['', [Validators.required, Validators.min(1)]],
      jobDescription: ['', Validators.required],
      candidatetype: ['', Validators.required],
      minexp: [''],
      maxexp: [''],
      perks:[''],
      isgender: ['', Validators.required],
      locations: ['', Validators.required],
      WorkFromHome: ['', Validators.required],
      qualification: [[], Validators.required],
      // branch:[[],Validators.required],
      // salary: ['', Validators.required],
      minSalary:['',Validators.required],
      maxSalary:['',Validators.required],
      perksgiven:[''],
      skills: ['', Validators.required],
      company_id: [''],
      state: [''],
      city: [''],
      issecuritygiven: ['', Validators.required],
      languages: this.fb.array([this.createLanguageGroup()]),
      jobStartTime: ['', Validators.required],
      jobEndTime: ['', Validators.required],
      interviewTime: ['', Validators.required],
      interviewDay: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  get languages(): FormArray {
    return this.jobForm.get('languages') as FormArray;
  }

  createLanguageGroup(): FormGroup {
    return this.fb.group({
      language: [null, Validators.required],
      rws: this.fb.group({
        read: [false],
        write: [false],
        speak: [false],
      }),
    });
  }
  private transformLanguagesData(languages: any[]): any[] {
    return languages.map((lang, index) => {
      const rwsArray = [];
      if (lang.rws.read) rwsArray.push('Read');
      if (lang.rws.write) rwsArray.push('Write');
      if (lang.rws.speak) rwsArray.push('Speak');

      return {
        // language_id: lang.language_id,
        language_id: index + 1,
        language: lang.language,
        rws: rwsArray.join(', '),
      };
    });
  }
  ngOnInit() {
    this.apiService.getJobCategory().subscribe((res: any) => {
      if (res.status === 'success') {
        this.dropdownOptions = res.data;
      }
    });
     this.apiService.getPerksCategory().subscribe((res: any) => {
      if (res.status === 'success') {
        this.perksOptions = res.data;
      }
    });
    
    const user_id = LocalStorageUtil.getItem('userId');

    const data = {
      user_id: user_id,
    };
    this.apiService.get_user_compID(data).subscribe(
      (response: any) => {
        this.jobForm.patchValue({
          company_id: response.company_id,
          state: response.state,
          city: response.city,
        });
        console.log('response:', response);
        this.company_id = response.company_id;
        this.state = response.state;
        this.city = response.city;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.getLanguages().subscribe((res: any) => {
      if (res.status === 'success') {
        this.languageOptions = res.data;
        // console.log(this.languageOptions);
      }
      if (res) {
        const skills = this.jobForm.get('rws')?.value;
      }
    });
    this.apiService.getEduQual().subscribe((res: any) => {
      if (res.status === 'success') {
        this.qualification = res.data;
      }
    });
    //  this.apiService.getEduBranch().subscribe((res: any) => {
    //   if (res.status === 'success') {
    //     this.branch = res.data;
    //   }
    // });
 
    this.apiService.getSkills().subscribe((res: any) => {
      if (res.status === 'success') {
        this.selectedSkills = res.data;
      }
    });
    const jobId = this.route.snapshot.queryParams['jobId'];

    this.route.queryParams.subscribe((params) => {
      const jobId = params['jobId'];
      // fetch data using jobId
      console.log('job id', jobId);
    });
    console.log('jobdg id', jobId);

    if (jobId) {
      this.apiService.employer_inactive_job_detail(jobId).subscribe({
        next: (res) => {
          console.log(res.data);
          const data = res.data;
          this.jobType = data.job_type;
          this.candidatetype = data.exp_checkbox;
          this.isgender = data.gender_req;
          this.selectedLocation = data.cand_loc_req;
          this.WorkFromHome = data.is_wfh;
          this.issecuritygiven = data.security_amount === 1 ? 'yes' : 'no';
          const selectedSkill = data.skills_required.map(
            (skill: { value: string }) => skill.value
          );
          const lang = data.job_languages.map(
            (lg: { language: string }) => lg.language
          );
          console.log(lang);
          this.jobForm.patchValue({
            jobTitle: data.job_title,
            jobCategory: data.job_category_id,
            jobType: data.job_type,
            positionsOpen: data.no_of_positions,
            jobDescription: data.job_description,
            candidatetype: data.exp_checkbox,
            minexp: data.min_exp,
            maxexp: data.max_exp,
            isgender: data.gender_req,
            locations: data.cand_loc_req,
            WorkFromHome: data.is_wfh,
            qualification: data.min_qual_id,
            // salary: data.salary_per_annum,
            minSalary:data.min_salary,
            maxSalary:data.max_salary,

            skills: selectedSkill,
            issecuritygiven: data.security_amount,
            jobStartTime: data.job_start_time,
            jobEndTime: data.job_end_time,
            interviewTime: data.interview_timmings,
            interviewDay: data.interview_days,
            languages: lang,
            //acceptTerms: !!data["Terms&conditions"], // convert to boolean
          });
          this.isRecreate=true;
        },
        error: () => {
          alert('Failed to load data');
        },
      });
    }
    else{
      this.isRecreate=false;
    }
  }
  
  markFormTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  formatTime(time: any): string {
    if (!time) return '';
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });}
  basicpg() {
    this.router.navigate(['/basic-details-page']);
  }
  companypg() {
    this.router.navigate(['/company-details-page']);
  }
  logout() {
    console.log('Logging out...');
    localStorage.clear();
    this.router.navigate(['/login']);
   
  }
  removeSkill(skill: any) {
    const currentSkills = this.jobForm.get('skills')?.value || [];
    this.jobForm
      .get('skills')
      ?.setValue(currentSkills.filter((id: number) => id !== skill.id));
  }
  addLanguage() {
    this.languages.push(this.createLanguageGroup());
  }
  removeLanguage(index: number) {
    if (this.languages.length > 1) {
      this.languages.removeAt(index);
    }
  }
  // nextStep() {
  //   this.markFormTouched(this.jobForm);
  //   if (this.jobForm.valid) {
  //     console.log('Form data:', this.jobForm.value);
  //     this.navCtrl.navigateForward('');
  //     const accepted = this.jobForm.value.acceptTerms ? true : false;
  //     console.log('Accepted value:', accepted);
  //     console.log(this.company_id);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  previousPage() {
    console.log('Previous step clicked');
    this.router.navigate(['/company-details-page']);
  }

  submitForm() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }
    const formValue = this.jobForm.value;
    const transformedLanguages = this.transformLanguagesData(
      formValue.languages
    );
    let minExp, maxExp;
    if (formValue.candidatetype === 'fresher') {
      minExp = 'Fresher';
      maxExp = 'Fresher';
    } else {
      // For experienced candidates, ensure we have valid numbers
      minExp = formValue.minexp?.toString() || '0';
      maxExp = formValue.maxexp?.toString() || '0';
    }
    const formData = {
      ...formValue,
      user_id: LocalStorageUtil.getItem('userId'),
      company_id: this.company_id,
      interviewDay: Array.isArray(formValue.interviewDay)
        ? formValue.interviewDay.join(',')
        : formValue.interviewDay,
      languages: transformedLanguages,
      skills: Array.isArray(formValue.skills)
        ? formValue.skills.join(',')
        : formValue.skills,
      min_exp: minExp,
      max_exp: maxExp,
    };

    console.log('Submitting form:', formData);

    this.apiService.submitJob(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        localStorage.setItem('type_Of_User','existing');
        this.router.navigate(['/employer-plan']);
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }

  selectQualifications(level: string) {
    this.selectedQualifications = level;
    this.jobForm.get('qualification')?.setValue(level);
    console.log('Selected qualification:', level);
  }
  // selectBranch(level: string) {
  //   this.selectedBranch = level;
  //   this.jobForm.get('branch')?.setValue(level);
  //   console.log('Selected branch:', level);
  // }

  selectWorkType(choice: string) {
    this.WorkFromHome = choice;
    this.jobForm.get('WorkFromHome')?.setValue(choice);
    console.log('Work from home:', choice);
  }

  selectgenderType(gender: string) {
    this.isgender = gender;
    this.jobForm.get('isgender')?.setValue(gender);
    console.log('Gender:', gender);
  }

  selectjobType(type: string) {
    this.jobType = type;
    this.jobForm.get('jobType')?.setValue(type);
    console.log('Job type:', type);
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.jobForm.get('locations')?.setValue(location);
    console.log('Candidate location:', location);
  }

  selectsecurity(security: string) {
    this.issecuritygiven = security;
    this.jobForm.get('issecuritygiven')?.setValue(security);
    console.log('Security deposit:', security);
  }

selectperks(bonus: string) {
    this.perks = bonus;
    this.jobForm.get('perks')?.setValue(bonus);
    console.log('bonus given:', bonus);
    if (bonus === 'no') {
    this.jobForm.get('perksgiven')?.reset(); // Clear selection if 'No' is selected
  }

  }

  selectcanType(cantype: string) {
    this.candidatetype = cantype;
    this.jobForm.get('candidatetype')?.setValue(cantype);

    if (cantype === 'fresher') {
      this.jobForm.get('minexp')?.setValue('Fresher');
      this.jobForm.get('maxexp')?.setValue('Fresher');
      this.jobForm.get('minexp')?.disable();
      this.jobForm.get('maxexp')?.disable();
    } else {
      this.jobForm.get('minexp')?.reset();
      this.jobForm.get('maxexp')?.reset();
      this.jobForm.get('minexp')?.enable();
      this.jobForm.get('maxexp')?.enable();
    }
  }

  handlerequirement(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Current value:', JSON.stringify(target.value));
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Current value:', JSON.stringify(target.value));
  }
}
  function formatTime(time: any, string: any) {
    throw new Error('Function not implemented.');
  }

