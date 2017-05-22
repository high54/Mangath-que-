import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilPage } from './user-profil-page';

@NgModule({
  declarations: [
    UserProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilPage),
  ],
  exports: [
    UserProfilPage
  ]
})
export class UserProfilPageModule {}
