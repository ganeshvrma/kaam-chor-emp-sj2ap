// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-account-setting',
//   standalone:false,
//   templateUrl: './account-setting.page.html',
//   styleUrls: ['./account-setting.page.scss'],
// })
// export class AccountSettingPage implements OnInit {
// oldemail: string = '';
// user_id!:number;
//   constructor(private apiService: ApiService) { }

//   ngOnInit() {
//   const storedUserId = localStorage.getItem('userId');
//   if (storedUserId) {
//     this.user_id = parseInt(storedUserId, 10);
    
//     this.apiService.getEmployerData(this.user_id).subscribe((res) => {
//       if (res.status && res.data) {
//         this.oldemail = res.data.email;
//         console.log('Old Email:', this.oldemail);

//         //  Only call update AFTER user_id and oldemail are confirmed
//         if(this.user_id && this.oldemail){
//           this.apiService.updateEmployerEmail(this.user_id, 'newemail@example.com')
//           .subscribe(
//             (res) => {
//               if (res.status) {
//                 console.log(' Email updated successfully');
//               } else {
//                 console.error(' Update failed:', res.message);
//               }
//             },
//             (error) => {
//               console.error(' HTTP Error:', error);
//             }
//           );
//         }
//       }
//     });
//   }
// }



// }
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account-setting',
  standalone:false,
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  user_id!: number;
  oldemail: string = '';
  newemail: string = '';
  editingEmail: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.user_id = parseInt(storedUserId, 10);

      this.apiService.getEmployerData(this.user_id).subscribe((res) => {
        if (res.status && res.data) {
          this.oldemail = res.data.email;
        }
      });
    }
  }

  enableEmailEdit() {
    this.editingEmail = true;
    this.newemail = this.oldemail; // pre-fill input
  }

  updateEmail() {
    if (!this.newemail || !this.user_id) return;

    this.apiService.updateEmployerEmail(this.user_id, this.newemail).subscribe(
      (res) => {
        if (res.status) {
          this.oldemail = this.newemail;
          this.editingEmail = false;
          console.log('Email updated successfully');
        } else {
          console.error('Update failed:', res.message);
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
}
