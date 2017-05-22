import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client-provider';
import { LoginPage } from '../login-page/login-page';
/**
 * Generated class for the DeconnexionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deconnexion-page',
  templateUrl: 'deconnexion-page.html',
})
export class DeconnexionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public client :ClientProvider) {
    this.client.getInstance().disconnect();
    this.navCtrl.setRoot(LoginPage);
    localStorage.setItem('token', "");

  }

}
