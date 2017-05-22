import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController, MenuController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users-provider';
import { ClientProvider } from '../../providers/client-provider';
import { InscriptionPage } from '../inscription-page/inscription-page';
import { ChangePasswordPage } from '../change-password-page/change-password-page';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  private usersService = this.client.getInstance().createAsyncMacroService({
    Type: UsersProvider,
    deploymentId: 'macro_0',
  }) as UsersProvider;

  private login: string = "";
  private password: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public client: ClientProvider, public toastCtrl: ToastController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private menu: MenuController) {
    this.menu.enable(false);

    if (localStorage.getItem('user') !== null && localStorage.getItem('user') !== "undefined") {
      if (JSON.parse(localStorage.getItem('user')).login !== null && JSON.parse(localStorage.getItem('user')).login !== "undefined") {
        this.login = JSON.parse(localStorage.getItem('user')).login;
      }

      if (JSON.parse(localStorage.getItem('user')).token !== null && JSON.parse(localStorage.getItem('user')).toekn !== 'undefined') {
        if (localStorage.getItem('token').length > 1) {
          this.client.getInstance().setCredentials({ 'token': JSON.parse(localStorage.getItem('user')).token });
          this.client.getInstance().connect();
          this.client.getInstance().addConnectionStatusListener({
            onConnectionEstablished: () => {
              this.navCtrl.setRoot(HomePage);
            }
          })
        }
      }
    }

  }
  private signin(login, password) {
    let loader = this.loadingCtrl.create({
      content: "Connexion...",
      duration: 2000
    });
    loader.present();
    this.client.getInstance().setCredentials({ 'login': login, 'password': password });
    this.client.getInstance().connect();
    this.client.getInstance().addConnectionStatusListener({
      onConnectionEstablished: () => {
        localStorage.setItem('token', this.client.getInstance().getSession().token);
        localStorage.setItem('login', login);
        this.navCtrl.setRoot(HomePage);
      },
      onFailedHandshake: () => {
        let toast = this.toastCtrl.create({
          message: 'Mauvais login ou mot de passe.',
          duration: 2000,
          position: 'middle'
        });
        toast.present(toast);
      }
    })

  }

  signup() {
    let inscriptionPage = this.modalCtrl.create(InscriptionPage);
    inscriptionPage.present();
  }
  resetPassword(login) {
    let changePasswordPage = this.modalCtrl.create(ChangePasswordPage, { 'login': login });
    changePasswordPage.present();
  }

}
