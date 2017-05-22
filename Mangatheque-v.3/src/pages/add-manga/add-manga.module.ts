import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMangaPage } from './add-manga';

@NgModule({
  declarations: [
    AddMangaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMangaPage),
  ],
  exports: [
    AddMangaPage
  ]
})
export class AddMangaModule {}
