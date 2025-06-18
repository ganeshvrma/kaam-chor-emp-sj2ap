import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-saved-candidates',
  standalone:false,
  templateUrl: './saved-candidates.page.html',
  styleUrls: ['./saved-candidates.page.scss'],
})
export class SavedCandidatesPage {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  itemsPerPage = 10;
  currentPage = 1;
  searchTerm = '';

  candidates = [
    {
      name: 'Abhishek Mishra',
      mobile: '7080547392',
      email: 'kaamchor2025+117@gmail.com',
      savedOn: '2025-02-24 00:34:31',
    },
    {
      name: 'Aman',
      mobile: '8572056933',
      email: 'kaamchor2025+8@gmail.com',
      savedOn: '2025-02-24 00:34:40',
    },
    {
      name: 'Aarushi Thakur',
      mobile: '6230076823',
      email: 'kaamchor2025+145@gmail.com',
      savedOn: '2025-02-25 00:29:37',
    },
  ];

  async presentActionSheet(user: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${user.name}`,
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

  viewCandidate(user: any) {
    // Navigate or show detail modal
    console.log('Viewing:', user);
  }

  removeCandidate(user: any) {
    this.candidates = this.candidates.filter(c => c !== user);
  }

  get filteredCandidates() {
    return this.candidates.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.mobile.includes(this.searchTerm)
    );
  }

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