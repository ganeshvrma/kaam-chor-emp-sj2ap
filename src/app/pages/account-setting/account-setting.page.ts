
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
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.user_id = parseInt(storedUserId, 10);
      this.getCurrentEmail();
    }
  }

  getCurrentEmail() {
    this.apiService.emailbyuserid(this.user_id).subscribe((res) => {
      if (res.status && res.data) {
        this.oldemail = res.data.email;
      }
    });
  }

  enableEmailEdit() {
    this.editingEmail = true;
    this.newemail = this.oldemail;
    this.errorMessage = '';
    this.successMessage = '';
  }

  updateEmail() {
    if (!this.newemail || !this.user_id) {
      this.errorMessage = 'Email cannot be empty.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.apiService.updateEmployerEmail(this.user_id, this.newemail).subscribe(
      (res) => {
        this.loading = false;
        if (res.status) {
          this.oldemail = this.newemail;
          this.editingEmail = false;
          this.successMessage = 'Email updated successfully!';
        } else {
          this.errorMessage = res.message || 'Update failed.';
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('HTTP Error:', error);
      }
    );
  }
}
