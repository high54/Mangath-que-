import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MangaModel } from '../../models/manga-model';

@IonicPage()
@Component({
  selector: 'page-manga-page',
  templateUrl: 'manga-page.html',
})
export class MangaPage {
private manga:MangaModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.manga = new MangaModel();
    this.manga =this.navParams.get('manga');
  }
}
