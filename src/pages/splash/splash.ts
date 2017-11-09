import { Component } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';
import { NetworkService } from '../../providers/network/network';
@IonicPage()
@Component({
  templateUrl: 'splash.html'
})

export class Splash {
  info_txt: string;
  constructor(
    private platform: Platform, 
    private network: NetworkService) {
    console.log("SplashPage.constructor()");
  }

  checkNetwork(){
    this.network.displayInfoAlert();
  }

  okAction() {
    console.log("SplashPage.okAction()");
    this.platform.exitApp();
  }
}