import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddSeriePage } from '../pages/add-serie/add-serie';
import { UpdateSeriePage } from '../pages/update-serie/update-serie';
import { MangasPage } from '../pages/mangas/mangas';
import { AddMangaPage } from '../pages/add-manga/add-manga';
import { UpdateMangaPage } from '../pages/update-manga/update-manga';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientProvider } from '../providers/client-provider';
import { MangaPage } from '../pages/manga-page/manga-page';

import { LoginPage } from '../pages/login-page/login-page';
import { InscriptionPage } from '../pages/inscription-page/inscription-page';
import { ChangePasswordPage } from '../pages/change-password-page/change-password-page';
import { DeconnexionPage } from '../pages/deconnexion-page/deconnexion-page';
import { UserProfilPage } from '../pages/user-profil-page/user-profil-page';
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        AddSeriePage,
        UpdateSeriePage,
        MangasPage,
        AddMangaPage,
        UpdateMangaPage,
        MangaPage,
        LoginPage,
        InscriptionPage,
        ChangePasswordPage,
        DeconnexionPage,
        UserProfilPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        AddSeriePage,
        UpdateSeriePage,
        MangasPage,
        AddMangaPage,
        UpdateMangaPage,
        MangaPage,
        LoginPage,
        InscriptionPage,
        ChangePasswordPage,
        DeconnexionPage,
        UserProfilPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        File,
        Transfer,
        Camera,
        FilePath,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ClientProvider
    ]
})
export class AppModule { }
