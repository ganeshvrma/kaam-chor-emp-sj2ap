import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-company-details-page',
  templateUrl: './company-details-page.page.html',
  styleUrls: ['./company-details-page.page.scss'],
  imports: [CommonModule, IonicModule] 
})
export class CompanyDetailsPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
