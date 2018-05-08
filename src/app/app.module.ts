import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';

/* pages */
import { HomePage } from '../pages/home/home';
import { AutenticacaoPage } from '../pages/autenticacao/autenticacao';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AuthProvider } from '../providers/auth/auth';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutenticacaoPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutenticacaoPage,
    CadastroPage
  ],
  providers: [
    AuthProvider,
    Camera,
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
