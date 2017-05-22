import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from '../../models/user-model';
import { UsersProvider } from '../../providers/users-provider';
// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';
/**
 * Generated class for the UserProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profil-page',
  templateUrl: 'user-profil-page.html',
})
export class UserProfilPage {
  private userService = this.client.getInstance().createAsyncMacroService({
      Type: UsersProvider,
      deploymentId: 'macro_0'
  }) as UsersProvider;
private user:UserModel;
private nbSeries:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public client:ClientProvider) {
    let stringUser = JSON.parse(localStorage.getItem('user'));
    this.user = new UserModel(stringUser.email,stringUser.login,stringUser.pseudo,stringUser.userKey,stringUser.token);
    this.userService.CountDetailsUser(this.user.UserKey).then((result)=>
  {
  this.nbSeries = result.nbSeries[0].nbSeries;
  })

  }
  goBack()
  {

      this.navCtrl.pop();
    
  }

}
