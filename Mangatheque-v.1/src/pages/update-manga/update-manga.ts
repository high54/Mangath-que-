import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import du model des mangas ainsi que du provider
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';

import { SerieModel } from '../../models/serie-model';


@IonicPage()
@Component({
  selector: 'page-update-manga',
  templateUrl: 'update-manga.html',
})
export class UpdateMangaPage {

  private titre: string = "";
  private tome: number = 1;
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
    this.manga = this.navParams.get('manga');
    this.titre = this.manga.GetTitre();
    this.tome = this.manga.GetTome();
    this.resume = this.manga.GetResume();
    this.idSerie = this.manga.GetIdSerie();
    this.isLu = this.manga.GetIsLu();
    this.isAcquis = this.manga.GetIsAcquis();
  }

  saveManga() {
    this.manga.SetIsLu(this.isLu);
    this.manga.SetTome(this.tome);
    this.manga.SetTitre(this.titre);
    this.manga.SetResume(this.resume);
    this.manga.SetIsAcquis(this.isAcquis);

    this.mangaService.MangaUpdateById(this.manga.GetId(), this.manga.GetTitre(),this.manga.GetTome(),this.manga.GetResume(),this.manga.GetIdSerie(),this.manga.GetIsLu(),this.manga.GetIsAcquis());
    this.viewCtrl.dismiss();
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }


}
