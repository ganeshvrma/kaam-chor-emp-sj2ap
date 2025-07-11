import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { InactiveJobDetailModalComponent } from 'src/app/inactive-job-detail-modal/inactive-job-detail-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-jobs',
  standalone:false,
  templateUrl: './inactive-jobs.page.html',
  styleUrls: ['./inactive-jobs.page.scss'],
})
export class InactiveJobsPage {
  constructor(private actionSheetCtrl: ActionSheetController,private apiService: ApiService,private modalCtrl: ModalController,private router:Router) {}
user_id!:number;
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
ngOnInit(){
  const storeid=localStorage.getItem('userId');
this.user_id=Number(storeid);
   this.apiService.employer_inactive_jobs({}, this.user_id).subscribe((res: any) => {
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
// filteredJobs(){
//   return this.jobs;
// }
  filteredJobs() {
    return this.jobs.filter(job =>
      job.job_title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
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
          text: 'Edit',
          icon: 'create-outline',
          handler: () => this.editJob(job),
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
async viewJob(job: any) {
  const modal = await this.modalCtrl.create({
    component: InactiveJobDetailModalComponent,
    // componentProps: { userId: user.user_id },
    componentProps: { jobId:job.job_id},

  });
  await modal.present();
}
  
  // editJob(job: any) {
  //   // console.log('Edit:', job);
  //   // navigate to edit job page
  //   this.router.navigate(['/job-detail-page'],job.job_id);

  // }
  editJob(job: any) {
    // console.log('Edit:', job);
    console.log(job.job_id);
    this.router.navigate(['/job-detail-page'], { 
        queryParams: { jobId: job.job_id } 
    });
}

  
}