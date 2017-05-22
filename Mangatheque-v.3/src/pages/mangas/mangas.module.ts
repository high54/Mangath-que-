import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MangasPage } from './mangas';

@NgModule({
  declarations: [
    MangasPage,
  ],
  imports: [
    IonicPageModule.forChild(MangasPage),
  ],
  exports: [
    MangasPage
  ]
})
export class MangasModule {}
