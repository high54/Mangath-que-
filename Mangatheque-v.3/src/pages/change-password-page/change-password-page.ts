import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users-provider';
import { ClientProvider } from '../../providers/client-provider';
import { HomePage } from '../home/home';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password-page',
  templateUrl: 'change-password-page.html',
})
export class ChangePasswordPage {
  private login: string = "";
  private usersService = this.client.getInstance().createAsyncMacroService({
    Type: UsersProvider,
    deploymentId: 'macro_0',
  }) as UsersProvider;
  private verif:boolean = false;
  private password: string = "";
  private confirmPassword: string = "";
  private token:string ="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public client:ClientProvider, private viewCtrl: ViewController, public toastCtrl: ToastController) {
    console.log(this.navParams.get('login'));
  }
  private verifLogin() {
    if (this.login != "") {
      this.client.getInstance().connect();
      this.client.getInstance().addConnectionStatusListener({
        onConnectionEstablished: () =>
        {
          this.usersService.ResetPasswordUser(this.login).then((result)=>
        {
          if(result.loginVerif)
          {
            let toastSendMail = this.toastCtrl.create({
              message: 'Un email vous a été envoyé.',
              duration: 2000,
              position: 'middle'
            });
            toastSendMail.present(toastSendMail);
            this.verif = true;
          }
          else
          {
            let toast = this.toastCtrl.create({
              message: 'Le login n\'est pas connu.',
              duration: 2000,
              position: 'middle'
            });
            toast.present(toast);
          }
        }).catch((error)=>
      {
        console.error(error);
      })
        }
      });

    }
    else
    {
      let toastLoginEmpty = this.toastCtrl.create({
        message: 'Le login doit être renseigné.',
        duration: 2000,
        position: 'middle'
      });
      toastLoginEmpty.present(toastLoginEmpty);
    }
}
changePassword()
{
  if (this.password.trim().length > 5) {
    if (this.password === this.confirmPassword) {
      this.usersService.ChangePasswordUser(this.token,this.password).then((result)=>
    {
      this.navCtrl.push(HomePage);
    }).catch((error)=>
  {
    let toastBadToken= this.toastCtrl.create({
      message: 'Le Token n\'est pas valide.',
      duration: 2000,
      position: 'middle'
    });
    toastBadToken.present(toastBadToken);
  });
    }
  }
}

dismiss() {
  this.viewCtrl.dismiss();
}
}
