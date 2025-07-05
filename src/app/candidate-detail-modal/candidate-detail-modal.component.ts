// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-candidate-detail-modal',
//   standalone:false,
//   templateUrl: './candidate-detail-modal.component.html',
//   styleUrls: ['./candidate-detail-modal.component.scss'],
// })
// export class CandidateDetailModalComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-detail-modal',
  standalone:true,
  imports:[IonicModule,CommonModule],
  templateUrl: './candidate-detail-modal.component.html',
   styleUrls: ['./candidate-detail-modal.component.scss'],
})
export class CandidateDetailModalComponent implements OnInit {
  @Input() userId!: number;
  userData: any;
  loading = true;
candidate_id!:number;
employer_Id!:number;
// isSameUser:boolean=false;
pdf:string="";
  constructor(private modalCtrl: ModalController, private apiService: ApiService,private alertController: AlertController) {}

  ngOnInit() {
    this.apiService.candidateDetail({},this.userId).subscribe({
      next: (res) => {
        this.userData = res.data;
        this.loading = false;
        this.downloadPdf();

        const can_Id=this.userId;
     console.log( "from can detail",can_Id);
        // this.isSameUser=true;
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
  close(){
     this.modalCtrl.dismiss();
  }
  async saveCandi() {
  // Save logic here (e.g. API call)
  // Assume candidate is saved successfully
const storeId=localStorage.getItem('userId');
this.employer_Id=Number(storeId);
console.log(" from save ",this.userId);
 this.apiService.save_candidate(this.employer_Id,this.userId).subscribe({
    next: (res) => {
        console.log("saved successfully");
      },
      error: () => {
        console.log("Not saved or already Saved");
        
      },
    });
  // Show confirmation alert
  const alert = await this.alertController.create({
    header: 'Success',
    message: 'Candidate has been saved successfully!',
    buttons: ['OK']
  });

  await alert.present();
}
 
  downloadPdf() {
    this.apiService.downloadResume(this.userId).subscribe(res=>{
      if (res.status) {
        this.pdf=res.file_path;
        
        //  console.log(this.pdf);
        console.log("Download Successfully");
      }
    });
    
  }
  viewpdf(){
    if (this.pdf) {
    window.open(this.pdf, '_blank');
  }
  }
}