import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppliedCandidateComponent } from 'src/app/applied-candidate/applied-candidate.component';
import { InactiveJobDetailModalComponent } from 'src/app/inactive-job-detail-modal/inactive-job-detail-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-jobs',
  standalone:false,
  templateUrl: './my-jobs.page.html',
  styleUrls: ['./my-jobs.page.scss'],
})
export class MyJobsPage {
  constructor(private actionSheetCtrl: ActionSheetController,
    private apiService: ApiService,
  private modalCtrl:ModalController) {}
user_id!:number;
job_id!:number;
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
   const storeid=localStorage.getItem('userId');
this.user_id=Number(storeid);
  // this.user_id = 310// Set actual value
  this.page = 1;
  this.limit = 10;

  this.apiService.employer_jobs({}, this.user_id, this.page, this.limit).subscribe((res: any) => {
    if (res.status === true) {
      this.jobs = res.data ;

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

  filteredJobs() {
    return this.jobs.filter(job =>
      job.job_title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
//   filteredJobs() {
//   return this.jobs; // no client-side filtering here
// }

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
        // {
        //   text: 'Edit',
        //   icon: 'create-outline',
        //   handler: () => this.editJob(job),
        // },
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

  // viewJob(job: any) {
  //   console.log('View:', job);
  //   // navigate to job details
  // }

  async viewJob(job:any)
{
const modal = await this.modalCtrl.create({
    component: InactiveJobDetailModalComponent,
    // componentProps: { userId: user.user_id },
    componentProps: {jobId:job.job_id},

  });
  await modal.present();
}
 deleteJob(job: any) {
    console.log('Deleted:', job);
    
    // Open confirmation popup before deleting
    this.openDeleteConfirmationPopup(job);
}

openDeleteConfirmationPopup(job: any) {
    // Confirmation popup implementation
    const confirmDelete = confirm('Are you sure you want to delete this job?');
    
    if (confirmDelete) {
        this.confirmDeleteJob(job);
    }
}

confirmDeleteJob(job: any) {
    // Mark job as inactive via API call
    this.apiService.inactive_jobstatus(job.job_id).subscribe({
      next: (res: any) => {
        console.log('Job marked as inactive successfully:', res);
        // Show success message to user
        this.showSuccessMessage('Job deleted successfully!');
        // Optional: Refresh the job list or update UI
        // this.loadJobs(); // Uncomment if you have a method to refresh the list
      },
      error: (error: any) => {
        console.error('Error marking job as inactive:', error);
        // Show error message to user
        this.showErrorMessage('Failed to delete job. Please try again.');
      }
    });
}
  showErrorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  showSuccessMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }

  editJob(job: any) {
    console.log('Edit:', job);
    // navigate to edit job page
  }

   async viewApplicants(job: any) {
    // console.log('Applied candidates:', job);
    // open applicants list
    const modal = await this.modalCtrl.create({
    component: AppliedCandidateComponent,
    // componentProps: { jobId: 1 },
    componentProps: {jobId:job.job_id},

  });
  await modal.present();
  }
}