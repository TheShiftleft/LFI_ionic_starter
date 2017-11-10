import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    formBuilder: FormBuilder) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(`Form is not valid yet. Current value : ${this.resetPasswordForm.value}`);
    } else {
      const email: string = this.resetPasswordForm.value.email;
      this.authProvider.resetPassword(email).then(user => {
        this.loading.dismiss().then(() => {
          let alert: Alert = this.alertCtrl.create({
            message: "Check your email for a password reset link",
            buttons: [{
              text: "OK",
              role: "cancel",
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        });
      }, (error) => {
        this.loading.dismiss().then(() => {
          //var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "OK", role: "cancel" }]
          });
          errorAlert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}

