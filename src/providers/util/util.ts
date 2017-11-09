import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Util {
  public static IS_DEBUG: boolean = false;
  public static CMD = {
    1: 'INIT',   // establishes login authenticity with the server
    2: 'CMD_1', 
    3: 'CMD_2',
    4: 'CMD_3', 
    5: 'CMD_4'
  };

  public static APP_STATE = {
    1: 'AUTH_SUCCESS',      // set when auth.lock.show() is called 
    2: 'STORE_DETAILS',     
    3: 'STATE_3', 
    4: 'STATE_4'               
  };

  // global variable indicating current app state:
  public static curr_app_state: any;
  // pop up toast every time network connection cuts in/out:
  public static DISPLAY_NETWORK_TOAST: boolean = false; 

  // returns an empty promise
  static emptyPromise(val = null) {
        return new Promise((resolve) => { resolve(val); });
    }

  constructor(public http: Http,
              public toastCtrl: ToastController) {
    console.log('Util.constructor()');
  }

    formatForAlert(json_arr: any) :string{
        let buffer:string = "";
        for (var i in json_arr['debug']){
        buffer += (json_arr['debug'][i] + "<br />");
            //console.log(dat_arr[i]);
        };
        return buffer;
    }

  displayAlert(ctrl: AlertController, thisTitle: string, mess: string){
    let alert = ctrl.create({
      title: thisTitle,
      message: mess,
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('ok clicked');
        }
      }]
    });
    alert.present();
  }

  reloadApp(ctrl: AlertController, mess: string){
    let alert = ctrl.create({
      title: "Restart Application?",
      message: mess,
      buttons: [{
        text: 'OK',
        handler: data => {
          window.location.reload();
        }
      }, {
        text: 'Cancel',
        handler: data => {
          console.log(" -> Action cancelled");
        }
      }]
    });
    alert.present();
  }

  // timeout mechanism
  public createTimeout(timeout) {
    console.log("Util.createTimeout()");
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(null),timeout)
        })
    }

   public displayToast(ctrl: ToastController, mess: string, duration_ms: number) {
    let toast = ctrl.create({
      message: mess,
      duration: duration_ms,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }
}

