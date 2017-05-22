import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import du model des mangas ainsi que du provider
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';

import { SerieModel } from '../../models/serie-model';

import { AddMangaPage } from '../add-manga/add-manga';
import { UpdateMangaPage } from '../update-manga/update-manga';
import { MangaPage } from '../manga-page/manga-page';
@IonicPage()
@Component({
    selector: 'page-mangas',
    templateUrl: 'mangas.html',
})
export class MangasPage {

    /**
    * Création du service pour les mangas
    */
    private mangaService = this.client.getInstance().createAsyncMacroService({
        Type: MangaProvider,
        deploymentId: 'macro_0'
    }) as MangaProvider;

    private serie: SerieModel = new SerieModel();
    private mangas: MangaModel[] = new Array<MangaModel>();
    constructor(public navCtrl: NavController, public navParams: NavParams, private client: ClientProvider, private modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.serie = this.navParams.get('serie');
        this.showMangas();
    }
    viewManga(manga)
    {
      this.navCtrl.push(MangaPage,{manga:manga})
    }
    showMangas() {
        this.mangaService.MangaGetAll(this.serie.GetId()).then((result) => {
            this.mangas = new Array<MangaModel>();
            for (let manga of result.mangas) {
                let newManga = new MangaModel();
                newManga.SetId(manga.id);
                newManga.SetIsLu(manga.isLu)
                newManga.SetTome(manga.tome);
                newManga.SetTitre(manga.titre);
                newManga.SetResume(manga.resume);
                newManga.SetIdSerie(manga.idSerie);
                newManga.SetIsAcquis(manga.isAcquis);
                newManga.SetCouverture(manga.couverture);
                this.mangas.push(newManga);
            }
            this.mangas.sort((a, b) => {
                if (a.GetTome() < b.GetTome()) {
                    return -1;
                }
                if (a.GetTome() > b.GetTome()) {
                    return 1;
                }
                return 0;
            })
        }).catch((error) => {
            console.error(error);
        })
    }
    addManga() {
        let modal = this.modalCtrl.create(AddMangaPage, { serie: this.serie, mangas: this.mangas });
        modal.present();
        modal.onDidDismiss((data) => {
            this.showMangas();
        })
    }
    editManga(manga) {
        let modal = this.modalCtrl.create(UpdateMangaPage, { manga: manga });
        modal.present();
    }
    deleteManga(manga) {
        let index = this.mangas.indexOf(manga);
        if (index > -1) {
            this.mangas.splice(index, 1);
        }

        this.mangaService.MangaDeleteById(manga.GetId());
    }

    showConfirm(manga) {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous supprimer ce manga ?',
            message: manga.GetTitre() + '<br />' + manga.GetTome(),
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {

                    }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        this.deleteManga(manga)
                    }
                }
            ]
        });
        confirm.present();
    }

}
