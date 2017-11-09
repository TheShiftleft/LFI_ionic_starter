import { Injectable } from '@angular/core';
import { Util } from '../util/util';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController, ToastController, Platform} from 'ionic-angular';
//NOTE: Network plugin is only available in Cordova. Doesn't work with 'ionic serve'
import { Network } from '@ionic-native/network';

declare var Connection;

// uses plugin cordova-plugin-network-information
@Injectable()
export class NetworkService {
  onDevice: boolean;
  disconnectSubscription: any;
  connectSubscription: any;


  constructor(public platform: Platform,
    private toast: ToastController,
    private alert: AlertController,
    public network: Network) {
       platform.ready().then(() => {
        console.log("NetworkService.constructor()");
        this.onDevice = platform.is('cordova');
        // watch network for a disconnect
        this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          //console.log('network was disconnected :-(');
          if(Util.DISPLAY_NETWORK_TOAST){
             this.presentToast("Network unavailable!");
          }
        });
        this.connectSubscription = this.network.onConnect().subscribe(() => {
          //console.log('network available :-)');
          if(Util.DISPLAY_NETWORK_TOAST){
            this.presentToast("Network available!");
          } 
        });
      }).catch(err => {
        console.log("NetworkService.constructor() -> Platform not ready: "+ err);
      });
  }

  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      //console.log("TEST: 1");
      return this.network.type !== Connection.NONE;
    } else {
      //console.log("TEST: 2");
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      //console.log("ONLINE - should return false");
      return this.network.type === Connection.NONE;
    } else {
      //console.log("OFFLINE - should return true");
      return !navigator.onLine;
    }
  }

  presentToast(mess: string) {
    let toast = this.toast.create({
      message: mess,
      duration: 1000, 
      position: 'top'
    });
    toast.present();
  }

  displayOfflineAlert(doClose: boolean) {
    let confirm = this.alert.create({
      title: "No connection available",
      subTitle: "Please connect to the internet",
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            if (doClose) {
              this.platform.exitApp();
            }
          }
        }
      ]
    });
    confirm.present();
  }

  displayInfoAlert() {
    let info: string = "<pre>Device: " + this.onDevice
      + "\nNetwork connection: " + this.network.type.toString()  
      + "\nnavigator onLine: " + navigator.onLine.valueOf() + "<\pre>";
    let confirm = this.alert.create({
      title: "Network Information",
      subTitle: info,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
