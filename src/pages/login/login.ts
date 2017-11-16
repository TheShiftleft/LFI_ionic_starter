import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthProvider } from '../../providers/auth/auth';
//import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

@IonicPage() 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  loginForm: FormGroup; 
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, 
    public authProvider: AuthProvider
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(`Form isn't valid yet, value: ${this.loginForm.value}`);
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authProvider.loginUser(email, password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('HomePage');
          });
        }, error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "OK", role: 'cancel' }]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
