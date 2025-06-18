import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-jobs',
  standalone:false,
  templateUrl: './my-jobs.page.html',
  styleUrls: ['./my-jobs.page.scss'],
})
export class MyJobsPage {
  constructor(private actionSheetCtrl: ActionSheetController,private apiService: ApiService) {}
user_id!:number;
limit!:number;
page!:number;
  entriesPerPage = 10;
  currentPage = 1;
  searchQuery = '';

  // jobs = [
  //   {
  //     title: 'Frontend Developer',
  //     type: 'Full-Time',
  //     company: 'Tech Corp',
  //     location: 'Bangalore',
  //     applicants: 24,
  //     posted: '2025-06-10',
  //     logo: 'assets/icons/kaam-chor-logo-removebg.png',
  //   },
  
  // ];
  jobs:any[]=[];
ngOnInit() {
  this.user_id = 310// Set actual value
  this.page = 1;
  this.limit = 10;

  this.apiService.employer_jobs({}, this.user_id, this.page, this.limit).subscribe((res: any) => {
    if (res.status === true) {
      this.jobs = res.data ||res.pagination;

      console.log('Jobs:', this.jobs);
    }
  });
}


  get totalEntries() {
    return this.filteredJobs().length;
  }

  get startEntry() {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  get endEntry() {
    return Math.min(this.startEntry + this.entriesPerPage - 1, this.totalEntries);
  }

  // filteredJobs() {
  //   return this.jobs.filter(job =>
  //     job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //     job.company.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }
  filteredJobs() {
  return this.jobs; // no client-side filtering here
}

  async presentActionSheet(job: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: job.title,
      buttons: [
        {
          text: 'View',
          icon: 'eye-outline',
          handler: () => this.viewJob(job),
        },
        {
          text: 'Delete (Inactive)',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => this.deleteJob(job),
        },
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => this.editJob(job),
        },
        {
          text: 'Applied Candidates',
          icon: 'people-outline',
          handler: () => this.viewApplicants(job),
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  viewJob(job: any) {
    console.log('View:', job);
    // navigate to job details
  }

  deleteJob(job: any) {
    console.log('Deleted:', job);
    // mark as inactive or remove
  }

  editJob(job: any) {
    console.log('Edit:', job);
    // navigate to edit job page
  }

  viewApplicants(job: any) {
    console.log('Applied candidates:', job);
    // open applicants list
  }
}