import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

import {Usuario} from '../../model/usuario.model';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public facebook: Facebook) {
  }

  private usuario:Usuario;

  saveFacebookCredentials(facebookCredential:any): Promise<any>{
    return firebase.auth().signInWithCredential(facebookCredential)
    .then((data) => {
      console.log("Firebase success: " + JSON.stringify(data));
      // this.userProfile = data;
    })
  .catch((error) => {
      console.log("Firebase failure: " + JSON.stringify(error));
  });

  }

  loginFacebook(){
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then((response) => {
    let params = new Array<string>();

    /* get the facebook credentials to log in into firebase */
    const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);
      
      /** login in into firebase with the facebook data */
    this.saveFacebookCredentials(facebookCredential);

      /** get some profile information from facebook */
    this.facebook.api("/me?fields=id,name,email,picture, gender", params)
      .then(res => {

        //estou usando o model para criar os usuarios
        this.usuario = new Usuario();
        this.usuario.nome = res.name;
        this.usuario.email = res.email;
        this.usuario.avatar = res.picture.data.url;
      }, (error) => {
        alert(error);
        console.log('ERRO LOGIN: ',error);
      })
    },
    (error) => {
        console.log(error);
        alert(error);
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
