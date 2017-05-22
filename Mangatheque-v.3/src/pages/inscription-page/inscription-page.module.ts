import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscriptionPage } from './inscription-page';

@NgModule({
  declarations: [
    InscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(InscriptionPage),
  ],
  exports: [
    InscriptionPage
  ]
})
export class InscriptionPageModule {}
