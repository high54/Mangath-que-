import { Component } from '@angular/core';
// Import des composants de Ionic
import { NavController, MenuController, ModalController, AlertController } from 'ionic-angular';

// Import du model des séries ainsi que du provider
import { SerieModel } from '../../models/serie-model';
import { SerieProvider } from '../../providers/serie-provider';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import des pages ou nous redirigerons l'utilisateur
import { AddSeriePage } from '../add-serie/add-serie';
import { UpdateSeriePage } from '../update-serie/update-serie';
import { MangasPage } from '../mangas/mangas';

import { UsersProvider } from '../../providers/users-provider';
import { UserModel } from '../../models/user-model';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


  private userService = this.client.getInstance().createAsyncMacroService({
      Type: UsersProvider,
      deploymentId: 'macro_0'
  }) as UsersProvider;
    /**
    * Création d'une variable service utilisant notre provider Serie
    * utilisant une instance de client pour créer un service Async
    * À l'heure actuelle il est important de caster le service en provider
    */
    private serieService = this.client.getInstance().createAsyncMacroService({
        Type: SerieProvider,
        deploymentId: 'macro_0'
    }) as SerieProvider;
    private series: SerieModel[] = new Array<SerieModel>();
    private groupedSeries = [];
    private user : UserModel;

    constructor(public navCtrl: NavController, private client: ClientProvider, private menu: MenuController, private modalCtrl: ModalController, public alertCtrl: AlertController) {

      this.userService.GetUserByLogin(localStorage.getItem('login')).then((result)=>
    {
        let userResult = result.result;
        this.user = new UserModel(userResult.email, userResult.login, userResult.pseudo, userResult.userKey, localStorage.getItem('token'));
        localStorage.setItem('user', JSON.stringify(this.user));
        this.showSerie();
    }).catch((error) => {
      console.error(error);
    })
    }

    showManga(serie) {
        this.navCtrl.push(MangasPage, { serie: serie});
    }
    addSerie() {
        let modal = this.modalCtrl.create(AddSeriePage);
        modal.present();
        modal.onDidDismiss((serie) => {

            if (serie !== undefined) {
                this.series.push(serie);
                this.groupSerie(this.series);
            }
        })
    }
    showSerie() {
        if (this.client.getInstance().isConnected()) {
            this.menu.enable(true);
            this.series = new Array<SerieModel>();
            this.serieService.SerieGetAll(this.user.UserKey).then((result) => {
                for (let serie of result.series) {
                    let newSerie = new SerieModel();
                    newSerie.SetId(serie.id);
                    newSerie.SetNom(serie.nom);
                    newSerie.SetResume(serie.resume);
                    this.series.push(newSerie);
                }
                this.groupSerie(this.series);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    editSerie(serie) {
        let modal = this.modalCtrl.create(UpdateSeriePage, { serie: serie});
        modal.present();
    }
    deleteSerie(serie: SerieModel) {
        let index = this.series.indexOf(serie);
        if (index > -1) {
            this.series.splice(index, 1);
            this.groupSerie(this.series);
        }
        this.serieService.SerieDeleteById(serie.GetId());
    }
    groupSerie(series) {
        this.groupedSeries = [];
        let sortedSeries = series.sort((a, b) => {
            if (a.GetNom() < b.GetNom()) {
                return -1;
            }
            if (a.GetNom() > b.GetNom()) {
                return 1;
            }
            return 0;
        });
        let currentLetter;
        let currentSeries = [];

        sortedSeries.forEach((value, index) => {
            if (value.GetNom().charAt(0) != currentLetter) {
                currentLetter = value.GetNom().charAt(0);
                let newGroup = {
                    letter: currentLetter,
                    series: []
                };
                currentSeries = newGroup.series;
                this.groupedSeries.push(newGroup);
            }
            currentSeries.push(value);
        });
    }
    showConfirm(serie) {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous supprimer cette série ainsi que tout les mangas ?',
            message: serie.GetNom(),
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {

                    }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        this.deleteSerie(serie)
                    }
                }
            ]
        });
        confirm.present();
    }

}
