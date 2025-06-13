import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  standalone:true,
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  imports:[IonicModule,CommonModule]
})
export class MyProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
