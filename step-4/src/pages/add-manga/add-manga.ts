import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import du model des mangas ainsi que du provider
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';

import { SerieModel } from '../../models/serie-model';

@IonicPage()
@Component({
    selector: 'page-add-manga',
    templateUrl: 'add-manga.html',
})
export class AddMangaPage {

    private titre: string = "";
    private tome: string = "";
    private resume: string = "";
    private idSerie: number = 0;
    private isLu: boolean = false;
    private isAcquis: boolean = false;

    private manga: MangaModel = new MangaModel();
    private serie: SerieModel = new SerieModel();

    private mangaService = this.client.getInstance().createAsyncMacroService({
        Type: MangaProvider,
        deploymentId: 'macro_0'
    }) as MangaProvider;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private client: ClientProvider) {
        this.serie = this.navParams.get('serie');
    }

    saveManga() {
        if (this.titre !== "undefined" && this.titre.length > 5) {
            this.tome = this.firstInUpper(this.tome);
            this.manga.SetIsLu(this.isLu);
            this.manga.SetTome(this.tome);
            this.manga.SetTitre(this.titre);
            this.manga.SetResume(this.resume);
            this.manga.SetIdSerie(this.serie.GetId());
            this.manga.SetIsAcquis(this.isAcquis);

            this.mangaService.MangaInsert(this.manga.GetTitre(), this.manga.GetTome(), this.manga.GetResume(), this.manga.GetIdSerie(), this.manga.GetIsLu(), this.manga.GetIsAcquis()).then((result) => {
                this.manga.SetId(result.id[0].id);
                this.viewCtrl.dismiss(this.manga);
            }).catch((error) => {
                console.error(error, "Erreur lors du Manga Insert - Page add-manga.ts");
            });

        }
    }
    public firstInUpper(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
