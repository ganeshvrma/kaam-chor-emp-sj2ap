import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
 
  constructor(private authService: AuthService, 
    private router: Router,
    private storage: Storage
  ) {
           this.initStorage();

  }
 async initStorage() {
    await this.storage.create();
  }
//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(['/home-screen']);
//       return false;
//     }
//     return true;
//   }
 
 async canActivate(): Promise<boolean> {
  // const isLoggedIn = !!localStorage.getItem('userId');
  const isLoggedIn= !! await this.storage.get('userId');
  if (isLoggedIn) {
    this.router.navigate(['/home-screen']);
    return false;
  }
  return true;
}
 
}