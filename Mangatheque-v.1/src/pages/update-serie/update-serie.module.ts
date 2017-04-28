import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateSeriePage } from './update-serie';

@NgModule({
  declarations: [
    UpdateSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateSeriePage),
  ],
  exports: [
    UpdateSeriePage
  ]
})
export class UpdateSerieModule {}
