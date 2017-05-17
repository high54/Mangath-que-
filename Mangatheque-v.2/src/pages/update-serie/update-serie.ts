import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SerieModel } from '../../models/serie-model';
import { SerieProvider } from '../../providers/serie-provider';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';
@IonicPage()
@Component({
    selector: 'page-update-serie',
    templateUrl: 'update-serie.html',
})
export class UpdateSeriePage {

    private serie: SerieModel = new SerieModel();
    private nom: string = "";
    private resume: string = "";
    private serieService = this.client.getInstance().createAsyncMacroService({
        Type: SerieProvider,
        deploymentId: 'macro_0'
    }) as SerieProvider;
    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private client: ClientProvider) {
        this.serie = this.navParams.get('serie');
        this.nom = this.serie.GetNom();
        this.resume = this.serie.GetResume();
    }
    saveSerie() {
        this.serie.SetNom(this.nom);
        this.serie.SetResume(this.resume);
        this.serieService.SerieUpdateById(this.serie.GetId(), this.serie.GetNom(), this.serie.GetResume());
        this.viewCtrl.dismiss(this.serie);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
