import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.page.html',
  styleUrls: ['./job-detail-page.page.scss'],
  imports: [CommonModule, IonicModule] 
})
export class JobDetailPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
