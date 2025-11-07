import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { LoadingInterceptor } from './interceptors/loading.service';
// import { IonicSelectableModule   } from 'ionic-selectable';

@NgModule({
  declarations: [AppComponent],
   
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,SidebarComponent, IonicStorageModule.forRoot(),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
