import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';
import {SerieModel} from '../../models/serie-model';
import { SerieProvider } from '../../providers/serie-provider';
import { ClientProvider } from '../../providers/client-provider';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {



    constructor(public navCtrl: NavController, private client: ClientProvider,private menu: MenuController) {
        this.client.getInstance().connect();
    }


}
