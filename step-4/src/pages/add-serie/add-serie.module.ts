import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSeriePage } from './add-serie';
@NgModule({
  declarations: [
    AddSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSeriePage),
  ],
  exports: [
    AddSeriePage
  ]
})
export class AddSerieModule {}
