import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent  {
  constructor(private storage: Storage) {
        this.initStorage();

  }
async initStorage() {
    await this.storage.create();
  }
  //  async ngOnInit() {
  //   await this.storage.create();
  // }
    // userType=localStorage.getItem('type_Of_User');
    // userType=  this.storage.get('type_Of_User');
  menuItems = [
    { title: 'Dashboard', icon: 'home', route: '/employer-plan' },
    { title: ' My Profile', icon: 'person-outline', route: '/my-profile' },
    { title: ' Candidate List', icon: 'list', route: '/candidate-list' },
    { title: 'My Jobs', icon: 'list-outline', route: '/my-jobs' },
    { title: 'Inactive Jobs', icon: 'list-outline', route: '/inactive-jobs' },
    { title: 'Post Job', icon: 'information-circle', route: '/basic-details-page' },

    // { title: 'Post Job', icon: 'information-circle', route: this.userType==="existing"?'/job-detail-page':'/basic-details-page' },
    { title: 'Saved Candidate', icon: 'bookmark-outline', route: '/saved-candidates' },
    // { title: ' Account Setting', icon: 'settings-outline', route: '/account-setting' },
    {title:'Logout',icon:'log-out-outline',action:'logout' }

  ];
}
