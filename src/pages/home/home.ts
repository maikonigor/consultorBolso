import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Usuario} from '../../model/usuario.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario:Usuario = this.authProvider.getUsuario();

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
      
  }

  logout(){
    this.authProvider.logoutUser();
  }

}
