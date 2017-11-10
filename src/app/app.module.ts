import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnePage } from '../pages/one/one';
import { TwoPage } from '../pages/two/two';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Splash } from '../pages/splash/splash';

import { AdminPage } from '../pages/admin/admin';
import { Network } from '@ionic-native/network';
import { NetworkService} from '../providers/network/network';
import { Util} from '../providers/util/util';

@NgModule({
  declarations: [
    MyApp,
    HomePage,     // Page
    OnePage,      // Page
    TwoPage,      // Page
    AboutPage,    // Menu
    ContactPage,  // Menu
    AdminPage,    // Menu
    TabsPage, 
    Splash  
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OnePage,
    TwoPage,
    AboutPage,
    ContactPage,
    AdminPage,
    TabsPage,
    Splash
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    NetworkService,
    Util
  ]
})
export class AppModule {}
