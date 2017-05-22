import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateMangaPage } from './update-manga';

@NgModule({
  declarations: [
    UpdateMangaPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateMangaPage),
  ],
  exports: [
    UpdateMangaPage
  ]
})
export class UpdateMangaModule {}
