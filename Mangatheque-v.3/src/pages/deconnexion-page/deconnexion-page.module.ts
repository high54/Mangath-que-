import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeconnexionPage } from './deconnexion-page';

@NgModule({
  declarations: [
    DeconnexionPage,
  ],
  imports: [
    IonicPageModule.forChild(DeconnexionPage),
  ],
  exports: [
    DeconnexionPage
  ]
})
export class DeconnexionPageModule {}
