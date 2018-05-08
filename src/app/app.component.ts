import { Component } from '@angular/core';
import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import {AutenticacaoPage} from '../pages/autenticacao/autenticacao';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  private firebaseConfig: any = {
    apiKey: "AIzaSyD4tqFXWLQWjzE3q24MfBwIwmMEO97O7OY",
    authDomain: "contultorbolso.firebaseapp.com",
    databaseURL: "https://contultorbolso.firebaseio.com",
    projectId: "contultorbolso",
    storageBucket: "contultorbolso.appspot.com",
    messagingSenderId: "552012213300"
  };
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(this.firebaseConfig);

    firebase.auth().signOut();
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = AutenticacaoPage;
        // unsubscribe();
      } else {
        this.rootPage = HomePage;
        // unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

