import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MangaPage } from './manga-page';

@NgModule({
  declarations: [
    MangaPage,
  ],
  imports: [
    IonicPageModule.forChild(MangaPage),
  ],
  exports: [
    MangaPage
  ]
})
export class MangaPageModule {}
