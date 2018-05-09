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
  this.authProvider.loginFacebook();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AutenticacaoPage');
  }

}
