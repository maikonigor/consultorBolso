import { Injectable } from '@angular/core';

import firebase from 'firebase';

import {Usuario} from '../../model/usuario.model';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
  }

  private usuario:Usuario;

  facebookLogin(facebookCredential:any): Promise<any>{
    return firebase.auth().signInWithCredential(facebookCredential)
    .then((data) => {
      console.log("Firebase success: " + JSON.stringify(data));
      // this.userProfile = data;
    })
  .catch((error) => {
      console.log("Firebase failure: " + JSON.stringify(error));
  });

  }

  loginByEmail(email:string, password:string): Promise<any>{
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  createUserByEmail(email:string, password:string): Promise<any>{
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
        .database()
        .ref('/userProfile')
        .child(newUser.uid)
        .set({ email: email });
      });
    }

    logoutUser(): Promise<void> {
      return firebase.auth().signOut();
    }

    getUsuario(): Usuario{
      return this.usuario;
    }

    setUsuario(usuario:Usuario):void{
      this.usuario = usuario;
    }
}
