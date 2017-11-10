import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
//import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      fullName: ['', Validators.compose([Validators.minLength(3), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(`Need to complete the form. Current value: ${this.signupForm.value}`);
    } else {
      this.authProvider.signupUser(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.fullName)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('HomePage');
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "OK", role: "cancel" }]
            });
            alert.present()
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}

