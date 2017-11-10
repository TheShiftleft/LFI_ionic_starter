import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  // user id is the user's UID we will use for saving data to the DB
  public userId: string = null;

  constructor(public afAuth: AngularFireAuth, 
              public afDatabase: AngularFireDatabase) 
  {
    console.log('AuthProvider Constructor');
    afAuth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
      }
    });
  }

  // log in to an existing account
  // if the function succeeds, Firebase will store the authentication 
  // object in localStorage.
  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // first time sign up and storage in Firebase DB
  // creating a user does not automatically store its details in a DB
  // (only locally, in localstorage). We need to do this manually.
  // After user created, the app logs the user in automatically
  signupUser(email: string, password: string, fullName: string): Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      // this reference will create a new node inside the userProfile node
      // and the UID identifies the node. The UID is Firebase's automatic 
      // id generated for the user.
      this.afDatabase.object(`/userProfile/${user.uid}/`)
      .set({
        admin: true, 
        email, 
        fullName
      });
    });
  }

  // returns empty Promise
  // Firebase will take care of all functionality
  resetPassword(email: string): Promise<void>{
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  // log out the user
  // we use it mainly to move the user to a different page.
  logoutUser(): Promise<void> {
    // turn off db refs first, in case the app is still listening to them
    // const userId:string = this.afAuth.auth.currentUser.uid;
    // this.afDatabase.object(`/userProfile/${userId}`).off();
    return this.afAuth.auth.signOut();
  }

  // return a custom promise
  isAdmin(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      firebase.database()
      .ref(`userProfile/${this.userId}/admin`)
      .once('value', adminSnapshot => {
        resolve(adminSnapshot.val());
      });
    });
  }

}
