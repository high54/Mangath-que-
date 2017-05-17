import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Loading, LoadingController, Platform } from 'ionic-angular';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';

// Import du model des mangas ainsi que du provider
import { MangaModel } from '../../models/manga-model';
import { MangaProvider } from '../../providers/manga-provider';
// Import des plugins pour gérer la couverture
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';


// Import du provider des couvertures
import { CouvertureProvider } from '../../providers/couverture-provider';
// Import du model des séries
import { SerieModel } from '../../models/serie-model';

declare var cordova: any;

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

    private couvertureService = this.client.getInstance().createAsyncMacroService({
            Type: CouvertureProvider,
            deploymentId: 'macro_0'
        }) as CouvertureProvider;

    private mangaService = this.client.getInstance().createAsyncMacroService({
        Type: MangaProvider,
        deploymentId: 'macro_0'
    }) as MangaProvider;
    public fileTransfer: TransferObject = this.transfer.create()
    lastImage: string = null;
    loading: Loading;
    constructor(public platform: Platform, public navCtrl: NavController, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public navParams: NavParams, private camera: Camera, private viewCtrl: ViewController, private client: ClientProvider) {
        this.serie = this.navParams.get('serie');
        this.mangas = this.navParams.get('mangas');
    }
    showMenu() {
        let menuAction = this.actionSheetCtrl.create({
            title: 'Choisir une image',
            buttons: [
                {
                    text: 'Album',
                    handler: () => {
                        this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camera',
                    handler: () => {
                        this.getImage(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        menuAction.present();
    }
    getImage(src) {

        var options = {
            quality: 100,
            sourceType: src,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };

        this.camera.getPicture(options).then((imagePath) => {
            if (this.platform.is('android') && src === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }).catch((error) => {
            console.error(error);
        });
    }
    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
    uploadImage() {

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;
        console.log(filename);


        this.loading = this.loadingCtrl.create({
            content: 'Chargement...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        this.couvertureService.uploadFile("/").then((result) => {
            let uploadUrl = result.upload.url;
            var options: FileUploadOptions;
            options = {
                fileKey: 'file',
                httpMethod: result.upload.httpMethod,
                mimeType: 'image/jpeg',
                chunkedMode: false,
                fileName: filename,
                headers: { 'Content-Type': 'image/jpeg' }
            }

            this.fileTransfer.upload(targetPath, encodeURI(uploadUrl), options, true).then(data => {
                this.loading.dismissAll()
                this.couvertureService.addFile(result.upload.guid).then((result) => {
                  this.manga.SetCouverture(result.file.url.url);
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error)=>{
              console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
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
                else {
                    this.verifDoublon = false;
                }
            }
            if (!this.verifDoublon) {
                this.mangaService.MangaInsert(this.manga.GetTitre(), this.manga.GetTome(), this.manga.GetResume(), this.manga.GetIdSerie(), this.manga.GetIsLu(), this.manga.GetIsAcquis(), this.manga.GetCouverture()).then((result) => {
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
