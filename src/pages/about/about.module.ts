import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
//import { TabsPage } from '../tabs/tabs';

@NgModule({
  declarations: [
    AboutPage,
   // TabsPage
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
  ],
})
export class AboutPageModule {}
