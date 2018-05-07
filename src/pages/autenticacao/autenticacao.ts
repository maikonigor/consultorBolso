import { Facebook } from '@ionic-native/facebook';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Usuario} from '../../model/usuario.model';

@IonicPage()
@Component({
  selector: 'page-autenticacao',
  templateUrl: 'autenticacao.html',
})
export class AutenticacaoPage {

  constructor(
      public facebook: Facebook,
      public navCtrl: NavController, 
      public navParams: NavParams) {
    
  }

  //método para chamar api do facebook e salvar no banco o usuario    
loginFacebook() {
  let permissions = new Array<string>();
  permissions = ["public_profile", "email"];

  this.facebook.login(permissions).then((response) => {
   let params = new Array<string>();

   this.facebook.api("/me?fields=name,email", params)
   .then(res => {

       //estou usando o model para criar os usuarios
       let usuario = new Usuario();
       usuario.nome = res.name;
       usuario.email = res.email;
       usuario.senha = res.id;
       usuario.login = res.email;
     
       this.logar(usuario);
   }, (error) => {
     alert(error);
     console.log('ERRO LOGIN: ',error);
   })
 }, (error) => {
   console.log(error);
   alert(error);
 });
}

logar(usuario: Usuario) {
//  this.salvarService.salvarFacebook(usuario)
//  .then(() => {
//      console.log('Usuario cadastrado via facebook com sucesso!');
//  })
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad AutenticacaoPage');
  }

}
