import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, AlertController, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/admin/admin';
//import { Util } from '../providers/util/util';
import { NetworkService } from '../providers/network/network';
//import { Splash } from '../pages/splash/splash';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html',
  //providers:[NetworkService],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: string; //any = TabsPage;
  public pages: Array<{title: string, component: any, icon: string}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public app: App, 
      public menuCtrl: MenuController, 
      public network: NetworkService, 
      public splashScreen: SplashScreen,
      public afAuth: AngularFireAuth) 
  {
    this.pages = [  // Menu Pages
      { title: 'About', component: AboutPage, icon: 'information-circle' },
      { title: 'Contact', component: ContactPage, icon: 'person' },
      { title: 'Admin Only', component: AdminPage, icon: 'build' }
    ];
    menuCtrl.enable(true, 'myMenu');
    afAuth.authState.subscribe(user => {
      if(!user){
        this.rootPage = 'LoginPage';
        // call unsubscribe() function returned by onAuthStateChanged(), 
        // once redirected, so it stops listening.
        // unsubscribe();
      } else{
        this.rootPage = 'TabsPage';
      }
    })
    platform.ready().then(() => {
      console.log("MyApp.constructor() -> Platform ready");
      this.statusBar.styleDefault();
      // splashscreen should have been shown up till now - Hide it.
      this.hideSplashScreen();
      this.initializeApp();
      this.platform.pause.subscribe(() => {
            console.log('[INFO] App paused');
      });

      this.platform.resume.subscribe(() => {
            console.log('[INFO] App resumed');
            this.hideSplashScreen();
            this.initializeApp();
            //this.util.reloadApp(this.alertCtrl,"Restart to upload latest data ...")
            //window.location.reload();
      });
    });
  }

  initializeApp() {
    console.log("MyApp.initializeApp()");
    // If no internet, go straight to splash
    if (this.network.isOffline()) {
        this.rootPage = 'Splash';
      }
      // if internet available, proceed to login
      else {
        console.log(" -> Network is online");
      }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  registerBackButton(){
    //Registration of push in Android and Windows Phone
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){ //Can we go back?
          console.log(" --> can go back, popping");
          nav.pop();
        }else{
          let alert = this.alertCtrl.create({
            title: "EXIT Application?",
            message: " Do you want to exit the application?",
            buttons: [{
              text: 'YES',
              handler: data => {
                console.log(" --> exiting");
                this.platform.exitApp(); //Exit from app;
              }
            }, {
              text: 'NO',
              handler: data => {
                console.log(" --> Return to TabsPage");
                nav.setRoot('TabsPage');
              }
            }]
          });
          alert.present();   
        }
      });
  }


  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }
}
