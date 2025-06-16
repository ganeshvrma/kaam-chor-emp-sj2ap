import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLinkActive,RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[IonicModule,RouterLinkActive,RouterLink]
})
export class SidebarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
