import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-basic-details-page',
  templateUrl: './basic-details-page.page.html',
  styleUrls: ['./basic-details-page.page.scss'],
  imports: [CommonModule, IonicModule] 
})
export class BasicDetailsPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
