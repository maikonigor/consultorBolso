import { AuthProvider } from '../../providers/auth/auth';

import { Component } from '@angular/core';

import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Usuario} from '../../model/usuario.model';

import {CadastroPage} from '../cadastro/cadastro';



@IonicPage()
@Component({
  selector: 'page-autenticacao',
  templateUrl: 'autenticacao.html',
})
export class AutenticacaoPage {

  userProfile: any = null;

  constructor(
     public authProvider: AuthProvider,
      public facebook: Facebook,
      public navCtrl: NavController, 
      public navParams: NavParams,) {
    
  }

registroClick(){
  
  this.navCtrl.push(CadastroPage);
}

  //método para chamar api do facebook e salvar no banco o usuario    
loginFacebook() {
  let permissions = new Array<string>();
  permissions = ["public_profile", "email"];

  this.facebook.login(permissions).then((response) => {
   let params = new Array<string>();

   /* get the facebook credentials to log in into firebase */
   const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
    
    /** login in into firebase with the facebook data */
   this.authProvider.facebookLogin(facebookCredential);

  /** get some profile information from facebook */
   this.facebook.api("/me?fields=id,name,email,picture, gender", params)
   .then(res => {

      //estou usando o model para criar os usuarios
      let usuario = new Usuario();
      usuario.nome = res.name;
      usuario.email = res.email;
      usuario.avatar = res.picture;
      this.authProvider.setUsuario(usuario);
       alert(
         res.id + " "
         +res.name + " "
         +res.email + " "
      )
   }, (error) => {
     alert(error);
     console.log('ERRO LOGIN: ',error);
   })
 }, (error) => {
   console.log(error);
   alert(error);
 });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AutenticacaoPage');
  }

}
