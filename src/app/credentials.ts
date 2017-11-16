// token used to login to Firebase
// provided by firebase after executing 'Add Firebase to your Web App' in developer's Firebase console
export const firebaseConfig = {
    apiKey: "AIzaSyDvmIyPu1aWJ-fCnLksPqp_hFZJqAYoNts",
    authDomain: "lfi-starter.firebaseapp.com",
    databaseURL: "https://lfi-starter.firebaseio.com",
    projectId: "lfi-starter",
    storageBucket: "lfi-starter.appspot.com",
    messagingSenderId: "649113292584"   // only user specific value?
};

// token used to login to Laravel API
export let laravelConfig = {
  apiUrl: 'http://test-jwt.theshiftleft.com/api',
  tokenName: 'token',
  user: {
    // use to register user's firebase id for Laravel to use when sending notifications
    firebase_id: '/auth/firebase',
    register: '/auth/signup',
    login: '/auth/login',
    refresh:'/refresh',
  },
  // example model
  items: '/items'
};

