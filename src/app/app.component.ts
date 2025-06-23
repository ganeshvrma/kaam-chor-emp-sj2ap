import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
   menuItems = [
    { title: 'Dashboard', icon: 'home', route: '/employer-plan' },
    { title: ' My Profile', icon: 'person-outline', route: '/my-profile' },
    { title: ' Candidate List', icon: 'list', route: '/candidate-list' },
    { title: 'My Jobs', icon: 'list-outline', route: '/my-jobs' },
    { title: 'Inactive Jobs', icon: 'list-outline', route: '/inactive-jobs' },
    { title: 'Post Job', icon: 'information-circle', route: '/basic-details-page' },
    { title: 'Saved Candidate', icon: 'bookmark-outline', route: '/saved-candidates' },
    { title: ' Account Setting', icon: 'settings-outline', route: '/account-setting' },
    {title:'Logout',icon:'log-out-outline',action:'logout' }

  ];
}
