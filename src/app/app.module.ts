import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { OnePage } from '../pages/one/one';
import { TwoPage } from '../pages/two/two';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { TabsPage } from '../pages/tabs/tabs';
//import { Splash } from '../pages/splash/splash';

import { AdminPage } from '../pages/admin/admin';
import { Network } from '@ionic-native/network';
import { NetworkService} from '../providers/network/network';
import { Util} from '../providers/util/util';
import { AuthProvider } from '../providers/auth/auth';

// Firebase authorisation
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './credentials';

// JWT
import {HttpModule, Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {AuthHttp, AuthConfig,JwtHelper} from 'angular2-jwt';

let storage = new Storage({});

// for Laravel Authorisation
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    //HomePage,     // Page
    OnePage,      // Page
    TwoPage,      // Page
    AboutPage,    // Menu
    ContactPage,  // Menu
    AdminPage,    // Menu
    //TabsPage, 
    //Splash  
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule, 
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule, 
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage,
    OnePage,
    TwoPage,
    AboutPage,
    ContactPage,
    AdminPage,
    //TabsPage,
    //Splash
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JwtHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]},
    Network,
    NetworkService,
    Util,
    AuthProvider
  ]
})
export class AppModule {}
