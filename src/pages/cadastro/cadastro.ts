import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  private camera_options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit: true,
    mediaType: this.camera.MediaType.PICTURE
  }

  private gallery_options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit:true,
    mediaType: this.camera.MediaType.PICTURE
  }

  private avatarSrc: String  = "assets/imgs/avatar.jpg";

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  backToLogin(){
    this.navCtrl.pop();
  }

  salvar(){

  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Alterar Imagem',
      buttons: [
        {
          text: 'Câmera',
          handler: () => {
            console.log('Abrir camera');
            this.openPhoto(this.camera_options);
          }
        },{
          text: 'Abrir Fotos',
          handler: () => {
            this.openPhoto(this.gallery_options);
            console.log('Abrir Fotos');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openPhoto (options: CameraOptions){
    let promise = this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.avatarSrc = base64Image;

     }, (err) => {
      // Handle error
      console.log(err)
     });
  }

}
