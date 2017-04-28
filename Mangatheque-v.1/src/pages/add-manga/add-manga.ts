import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import du model des mangas ainsi que du provider
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';


// Import du model des séries
import { SerieModel } from '../../models/serie-model';

@IonicPage()
@Component({
    selector: 'page-add-manga',
    templateUrl: 'add-manga.html',
})
export class AddMangaPage {

    private titre: string = "";
    private tome: number;
    private resume: string = "";
    private isLu: boolean = false;
    private isAcquis: boolean = false;

    private manga: MangaModel = new MangaModel();
    private serie: SerieModel = new SerieModel();
    private mangas: MangaModel[] = new Array<MangaModel>();
    private verifDoublon: boolean = false;

    private mangaService = this.client.getInstance().createAsyncMacroService({
        Type: MangaProvider,
        deploymentId: 'macro_0'
    }) as MangaProvider;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private client: ClientProvider) {
        this.serie = this.navParams.get('serie');
        this.mangas = this.navParams.get('mangas');
    }

    saveManga() {
        if (Number(this.tome) && this.titre.length > 2) {
            this.manga.SetIsLu(this.isLu);
            this.manga.SetTome(this.tome);
            this.manga.SetTitre(this.titre);
            this.manga.SetResume(this.resume);
            this.manga.SetIdSerie(this.serie.GetId());
            this.manga.SetIsAcquis(this.isAcquis);
            
            for (let mangaOld of this.mangas) {
                if (mangaOld.GetTome() == this.manga.GetTome()) {
                    this.verifDoublon = true;
                    break;
                }
                else
                {
                  this.verifDoublon = false;
                }
            }
            if (!this.verifDoublon) {
                this.mangaService.MangaInsert(this.manga.GetTitre(), this.manga.GetTome(), this.manga.GetResume(), this.manga.GetIdSerie(), this.manga.GetIsLu(), this.manga.GetIsAcquis()).then((result) => {
                    this.manga.SetId(result.id[0].id);
                    this.viewCtrl.dismiss(this.manga);
                }).catch((error) => {
                    console.error(error, "Erreur lors du Manga Insert - Page add-manga.ts");
                });
            }

        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
