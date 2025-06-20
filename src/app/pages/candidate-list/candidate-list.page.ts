import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
interface State {
  id: number | string;
  name: string;
}

interface City {
  id: number | string;
  name: string;
}

interface Qualification {
  id: number | string;
  value: string;
}

interface Language {
  id: number | string;
  language: string;
}

interface Candidate {
  name: string;
  dob: string | null;
  gender: string | null;
  state_name: string | null;
  city_name: string | null;
  highest_qualification: string | null;
  title_of_education: string | null;
  have_experience: string; // "Yes" | "No"
  year_of_experience: string;
  industry_type: string | null;
  skills: string[]; // always expect array
  joined: string | null;
  last_active: string | null;
}

interface CandidateApiResponse {
  status: boolean;
  message: string;
  data: Candidate[];
  pagination: {
    total_count: number;
    current_page: number;
    total_pages: number;
    limit: number;
  };
}


@Component({
  selector: 'app-candidate-list',
  standalone: false,
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit, OnDestroy {
  // filterForm: FormGroup;
  // candidates: any[] = [];
  // currentPage = 1;
  // pageSize = 10;
  // totalPages = 1;

  // states: any[] = [];
  // cities: any[] = [];
  // qualifications: any[] = [];
  // skillsList: string[] = [];
  // languages: any[] = [];
  filterForm: FormGroup;
  candidates: Candidate[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  states: State[] = [];
  cities: City[] = [];
  qualifications: Qualification[] = [];
  skillsList: any[] = [];
  languages: Language[] = [];
  experienceYears: number[] = [];
  // experienceYears: number[] = [];

  englishProficiencyOptions = [
    { label: 'Expert', value: 'Expert' },
    { label: 'Fluent', value: 'Fluent' },
    { label: 'Not so fluent', value: 'Not so fluent' }
  ];



  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.filterForm = this.fb.group({
      state: [''],
      city_id: [''],
      qualification_id: [''],
      english_proficiency: [''],
      skills: [[]],
      experience_min: [''],
      last_active: [''],
    });
  }

  ngOnInit() {
    this.experienceYears = Array.from({ length: 30 }, (_, i) => i + 1);
    // Load dropdown values
    this.loadStates();
    this.loadQualifications();
    this.loadLanguages();
    this.loadSkills();

    // React to form value changes with debounce
    this.filterForm.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentPage = 1;
        this.fetchCandidates();
      });

    this.fetchCandidates();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ✅ Load States
  loadStates() {
    this.api.getStates().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.states = res?.data || [];
        console.log('States loaded:', this.states);
      },
      error: (err) => {
        console.error('Failed to load states:', err);
      }
    });
  }

  // ✅ Load Cities based on selected State
  onStateChange(event: any) {
    const stateId = event.detail.value;
    this.cities = []; // Reset cities before loading new ones
    if (stateId) {
      this.api.getCitiesByState(stateId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.cities = res?.data || [];
          console.log('Cities loaded:', this.cities);
        },
        error: (err) => {
          console.error('Failed to load cities:', err);
        }
      });
    }
  }

  // ✅ Load Qualifications
  loadQualifications() {
    this.api.getEduQual().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.qualifications = res?.data || [];
        console.log('Qualifications loaded:', this.qualifications);
      },
      error: (err) => {
        console.error('Failed to load qualifications:', err);
      }
    });
  }

  // ✅ Load Languages
  loadLanguages() {
    this.api.getLanguages().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.languages = res?.data || [];
        console.log('Languages loaded:', this.languages);
      },
      error: (err) => {
        console.error('Failed to load languages:', err);
      }
    });
  }

  // ✅ Load Skills
  loadSkills() {
    this.api.getSkills().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.skillsList = res?.data || [];
        console.log('Skills loaded:', this.skillsList);
      },
      error: (err) => {
        console.error('Failed to load skills:', err);
      }
    });
  }

  onCityChange() {
    this.currentPage = 1;
    this.fetchCandidates();
  }


  generateFilterPayload() {
    const form = this.filterForm.value;

    return {
      page: this.currentPage,
      limit: this.pageSize,
      city_id: form.city_id || null,
      skills: Array.isArray(form.skills) && form.skills.length ? form.skills.join(',') : null,
      last_active: form.last_active || null,
      qualification_id: form.qualification_id || null,
      experience_min: form.experience_min || null,
      english_proficiency: form.english_proficiency || null
    };
  }
  fetchCandidates() {
    const payload = this.generateFilterPayload();

    this.api.candidates(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.status && Array.isArray(res.data)) {
          this.candidates = res.data.map((candidate: { skills: any; }) => ({
            ...candidate,
            skills: Array.isArray(candidate.skills) ? candidate.skills : []
          }));
          this.totalPages = res.pagination?.total_pages || 1;
          this.currentPage = res.pagination?.current_page || 1;
        } else {
          this.candidates = [];
          this.totalPages = 1;
          this.currentPage = 1;
        }
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
        this.candidates = [];
        this.totalPages = 1;
        this.currentPage = 1;
      }
    });
  }



  //   fetchCandidates() {
  //   const form = this.filterForm.value;

  //   const selectedSkills = Array.isArray(form.skills) ? form.skills : [];

  //   const payload = {
  //     page: this.currentPage,
  //     limit: this.pageSize,
  //     city_id: form.city_id || null,
  //     skills: selectedSkills.length ? selectedSkills.join(',') : null,
  //     last_active: form.last_active || null,
  //     qualification_id: form.qualification_id || null,
  //     experience_min: form.experience_min || null,
  //     english_proficiency: form.english_proficiency || null,
  //   };

  //   this.api.candidates(payload).pipe(takeUntil(this.destroy$)).subscribe({
  //     next: (res: CandidateApiResponse) => {
  //       if (res.status && Array.isArray(res.data)) {
  //         this.candidates = res.data.map((candidate: Candidate) => ({
  //           ...candidate,
  //           skills: Array.isArray(candidate.skills) ? candidate.skills : []
  //         }));
  //         this.totalPages = res.pagination?.total_pages || 1;
  //         this.currentPage = res.pagination?.current_page || 1;
  //       } else {
  //         this.candidates = [];
  //         this.totalPages = 1;
  //         this.currentPage = 1;
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching candidates:', err);
  //       this.candidates = [];
  //       this.totalPages = 1;
  //       this.currentPage = 1;
  //     }
  //   });
  // }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCandidates();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCandidates();
    }
  }

  resetFilters() {
    this.filterForm.reset();
    this.cities = [];
    this.currentPage = 1;
    this.fetchCandidates();
  }

  isArray(input: any): boolean {
    return Array.isArray(input);
  }
}
