import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users-provider';
import { ClientProvider } from '../../providers/client-provider';
import { HomePage } from '../home/home';
/**
 * Generated class for the InscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inscription-page',
  templateUrl: 'inscription-page.html',
})
export class InscriptionPage {

  private usersService = this.client.getInstance().createAsyncMacroService({
    Type: UsersProvider,
    deploymentId: 'macro_0',
  }) as UsersProvider;
  private login: string = "";
  private pseudo: string = "";
  private password: string = "";
  private confirmPassword: string = "";
  private email: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public client: ClientProvider, public toastCtrl: ToastController) {

  }

  signup() {
    if (this.login != "" && this.password != "" && this.confirmPassword != "" && this.pseudo != "" && this.email != "") {
      this.client.getInstance().connect()
      this.client.getInstance().addConnectionStatusListener({
        onConnectionEstablished: () => {
          this.usersService.IsLoginAvailable(this.login).then((result) => {

            if (result.verifLogin) {
              if (this.password.length > 5) {
                if (this.password === this.confirmPassword) {
                  if (this.ValidateEmail(this.email)) {
                    if (this.pseudo.length > 5) {
                      this.usersService.InsertUser(this.login,this.password, this.email, this.pseudo).then((result) => {
                        localStorage.setItem('token', this.client.getInstance().getSession().token);
                        localStorage.setItem('login', this.login);
                        this.navCtrl.setRoot(HomePage);
                        }).catch((error) => {
                          console.error(error);
                          });
                    }
                    else {
                      let toastPseudoVerifcation = this.toastCtrl.create({
                        message: 'Le pseudo est trop court.',
                        duration: 2000,
                        position: 'middle'
                      });
                      toastPseudoVerifcation.present(toastPseudoVerifcation);
                    }

                  }
                  else {
                    let toastMailVerification = this.toastCtrl.create({
                      message: 'L\'adresse email n\'est pas valide.',
                      duration: 2000,
                      position: 'middle'
                    });
                    toastMailVerification.present(toastMailVerification);
                  }
                }
                else {
                  let toastPasswordIdentique = this.toastCtrl.create({
                    message: 'Les mot de passe ne sont pas identique.',
                    duration: 2000,
                    position: 'middle'
                  });
                  toastPasswordIdentique.present(toastPasswordIdentique);
                }
              }
              else {
                let toastPasswordCourt = this.toastCtrl.create({
                  message: 'Le Mot de passe est trop court.',
                  duration: 2000,
                  position: 'middle'
                });
                toastPasswordCourt.present(toastPasswordCourt);
              }
            }
            else {
              let toast = this.toastCtrl.create({
                message: 'Le login est déjà utilisé.',
                duration: 2000,
                position: 'middle'
              });
              toast.present(toast);
            }


          })
        }
      });
    }
    else {
      let toastAllEmpty = this.toastCtrl.create({
        message: 'Les champs ne peuvent être vide.',
        duration: 2000,
        position: 'middle'
      });
      toastAllEmpty.present(toastAllEmpty);
    }
  }

  private ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
