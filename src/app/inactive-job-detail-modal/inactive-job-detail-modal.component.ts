import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-job-detail-modal',
  standalone:true,
  imports:[IonicModule,CommonModule],
  templateUrl: './inactive-job-detail-modal.component.html',
  styleUrls: ['./inactive-job-detail-modal.component.scss'],
})
export class InactiveJobDetailModalComponent  implements OnInit {
  //  @Input() userId!: number;
   @Input() jobId!:number;
    jobData:any;
  loading = true;

    constructor(private modalCtrl: ModalController, private apiService: ApiService,  private router: Router,) {}
  
  ngOnInit() {
     this.apiService.employer_inactive_job_detail(this.jobId).subscribe({
      next: (res) => {
        this.jobData = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load data');
        this.dismiss();
      },
    });
  }
dismiss() {
    this.modalCtrl.dismiss();
  }
  goBack(){
    this.modalCtrl.dismiss();
  }
  activeButton: string = 'description';  // Default active button

  setActiveButton(button: string) {
    this.activeButton = button;
  }
  // backpage(){
  //   this.router.navigate(['Smy-jobs'])
  // }
}
