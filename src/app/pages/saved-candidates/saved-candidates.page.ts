import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CandidateDetailModalComponent } from 'src/app/candidate-detail-modal/candidate-detail-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-saved-candidates',
  standalone:false,
  templateUrl: './saved-candidates.page.html',
  styleUrls: ['./saved-candidates.page.scss'],
})
export class SavedCandidatesPage {
 
  constructor(private actionSheetCtrl: ActionSheetController,private apiService: ApiService,private modalCtrl: ModalController) {}
  employer_id!:number;
   user_id!:number;
  limit!:number;
page!:number;
ngOnInit() {
  const storedUser=localStorage.getItem('userId');
  this.employer_id=Number(storedUser);
  // this.employer_id = 310// Set actual value
  this.page = 1;
  this.limit = 10;

  this.apiService.savedCandidates( this.employer_id, this.page, this.limit).subscribe((res: any) => {
    if (res.status==="success") {
      this.candidates = res.data ;

      console.log('Jobs:', this.candidates);
    }
  });
}
  itemsPerPage = 10;
  currentPage = 1;
  searchTerm = '';
candidates:any[]=[];
  // candidates = [
 
  //   {
  //     name: 'Aarushi Thakur',
  //     mobile: '6230076823',
  //     email: 'kaamchor2025+145@gmail.com',
  //     savedOn: '2025-02-25 00:29:37',
  //   },
  // ];

  async presentActionSheet(user: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${user.candidate_name}`,
      buttons: [
        {
          text: 'View',
          icon: 'eye-outline',
          handler: () => {
            this.viewCandidate(user);
          },
        },
        {
          text: 'Remove',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removeCandidate(user);
          },
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

  // viewCandidate(user: any) {
  //   // Navigate or show detail modal
  //   console.log('Viewing:', user);
  // }
async viewCandidate(user: any) {
  const modal = await this.modalCtrl.create({
    component: CandidateDetailModalComponent,
    componentProps: { userId: user.user_id },
    // componentProps: { userId:5 },

  });
  await modal.present();
}

  removeCandidate(user: any) {
  this.apiService.deleteSavedCandidate(this.employer_id, user.user_id).subscribe({
    next: (res: any) => {
      console.log("Deleted successfully");

      // Now call savedCandidates again
      this.apiService.savedCandidates(this.employer_id, this.page, this.limit).subscribe((res: any) => {
        if (res.status === "success") {
          this.candidates = res.data;
          console.log('Updated candidates:', this.candidates);
        }
      });
    },
    error: (err) => {
      console.error('Error deleting candidate:', err);
    }
  });
}


  get filteredCandidates() {
    return this.candidates.filter(c =>
      c.candidate_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.email_id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.mobile_number.includes(this.searchTerm)
    );
  }
// get filteredCandidates(){
//   return this.candidates;
// }
  paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCandidates.slice(start, start + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.filteredCandidates.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}