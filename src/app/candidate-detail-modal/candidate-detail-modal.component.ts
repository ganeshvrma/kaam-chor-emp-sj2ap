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
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-detail-modal',
  standalone:true,
  imports:[IonicModule,CommonModule],
  templateUrl: './candidate-detail-modal.component.html',
})
export class CandidateDetailModalComponent implements OnInit {
  @Input() userId!: number;
  userData: any;
  loading = true;

  constructor(private modalCtrl: ModalController, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.candidateDetail({},this.userId).subscribe({
      next: (res) => {
        this.userData = res.data;
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

  // downloadPdf() {
  //   const doc = new jsPDF();

  //   doc.text('Candidate Details', 14, 20);

  //   const rows = [
  //     ['Name', this.userData.about_me.name ],
  //     // ['Age', this.userData.age],
  //     ['Gender', this.userData.about_me.gender],
  //     // ['Education', this.userData.education],
  //     // ['Experience', this.userData.experience],
  //     // ['Skills', this.userData.skills],
  //     ['Email', this.userData.about_me.email],
  //     ['Phone', this.userData.about_me.phone],
  //   ];

  //   (doc as any).autoTable({
  //     head: [['Field', 'Value']],
  //     body: rows,
  //     startY: 30,
  //   });

  //   doc.save(`${ this.userData.about_me.name}_Details.pdf`);
  // }
}
