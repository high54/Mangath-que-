import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// Import du model des séries ainsi que du provider
import { SerieModel } from '../../models/serie-model';
import { SerieProvider } from '../../providers/serie-provider';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';
/**
 * Generated class for the AddSerie page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-add-serie',
    templateUrl: 'add-serie.html',
})
export class AddSeriePage {
    private seriveSerie = this.client.getInstance().createAsyncMacroService({
        Type: SerieProvider,
        deploymentId: 'macro_0'
    }) as SerieProvider;
    private nom: string = "";
    private resume: string = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private client: ClientProvider) {
    }

    saveSerie() {
        if (this.nom !== "undefined" && this.nom.length > 5) {
            let serie = new SerieModel();
            serie.SetNom(this.nom);
            serie.SetResume(this.resume);
            this.seriveSerie.SerieInsert(serie.GetNom(), serie.GetResume()).then((result) => {
                serie.SetId(result.id[0].id);
                this.viewCtrl.dismiss(serie);
            }).catch((error) => {
                console.error(error, "Erreur lors du Serie Insert - Page add-serie.ts");
            });

        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
