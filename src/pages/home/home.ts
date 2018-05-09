import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Usuario} from '../../model/usuario.model';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario:Usuario = this.authProvider.getUsuario();

  name:string = "name";
  cards = [
    {"title": "Dayneres Targueryan", "image": "assets/imgs/dayneres.jpg"},
    {"title": "Ned Stark", "image": "assets/imgs/ned.jpg"},
    {"title": "Aya Stark", "image": "assets/imgs/arya.jpg"},
    {"title": "John Snow", "image": "assets/imgs/snow.jpg"},
  ];
  public stackConfig: StackConfig;
  recentCard: string = '';
  
  
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 300;
      }
    };
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  trackByCards(index:number,cardData:any){
    // console.log('trackByCards');
    // console.log(cardData);
    // console.log(cardData.email);
    if(cardData)
      return cardData.title;
    else
      return true;
  }

  dragLeft(){
    console.log("Arrastou para a esquerda");
    let removedCard = this.cards.pop();

  }

  dragRight(){
    console.log("Arrastou para a direita");
    let removedCard = this.cards.pop();
  }

  logout(){
    this.authProvider.logoutUser();
  }

}
