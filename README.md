## Mangatheque
Tutoriel Mangatheque sous ZMS et Ionic 3


# Mangathèque v 0.1 :
Affichage, Modification, Suppression et Ajout de série<br />
Affichage, Modification, Suppression et Ajout de manga<br />

# Mangathèque v 0.2

Possibilité d'ajouter des couvertures aux mangas<br />
Ajout via la caméra du téléphone<br />
Ajout depuis l'album du téléphone<br />

# Synopsis

La plate-forme ZetaPush permet de réaliser toutes vos applications connectées à un coût maîtrisé en s'affranchissant :

- De l'hébergement

- Du développement des API nécessaires au bon fonctionnement des applications

- De la gestion, de la maintenance et de la montée en charge des serveurs

# Introduction

Dans ce tutoriel je vais vous présenter la manière de gérer les bases de données avec ZetaPush et à titre d'exemple comment réaliser une application pour mobile de gestion de collection : Manga / Vidéo / BD / Album etc.

Nous allons réaliser cette application grâce au langage de programmation intégré à ZetaPush c'est à dire ZMS (ZetaPush Macro Script) et Ionic.

**Exemple**

Voici le résultat à la fin de se tutoriel :



[youtube][640x360][][https:\/\/www.youtube.com/watch?v=h555EtMiR6U]

L'intégralité du contenu de l'application fonctionnel est disponible sur GitHub :

[https://github.com/high54/Mangatheque](https://github.com/high54/Mangatheque)

Tout d'abord il est important de mettre en place notre espace de travail.

#  Mise en place de l'environnement de travail

##  Les IDE

Il est possible de tout réaliser à l'aide d'Eclipse cependant je préfère travailler sur Atom pour le développement en Type Script.

Je vous conseille donc d'installer [Atom](https://atom.io/) et d'ajouter les packages : atom-beautify et atom-typescript ainsi que les dépendances.  
Pour la partie ZMS nous utiliserons [Eclipse](http://www.eclipse.org/downloads/) Mars 2 ou plus récent. Il est important de disposer de [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) sur votre machine !

Une fois Eclipse en place, rendez-vous dans Help -> Install New Software…    
 En haut à droite cliquer sur Add… puis saisissez les informations suivantes.   
 Name : ZMS   
 Location : https://zms-site.zetapush.com/releases/

Ensuite cliquer sur Select ALL et Next, finissez l'installation et vous devriez avoir un nouveau menu :

![](./images/zmsMenu-300x52.png)

## Node.Js et Ionic 3

Veuillez télécharger et installer [Node.Js](https://nodejs.org/en/) . Je conseille de prendre la version stable.   
 Une fois Node installé, nous allons utiliser l'invite de commandes Windows afin d'installer Ionic.   
 Ionic est une surcouche d'Angular 4. Si vous avez déjà réalisé des projets sous Angular, ceci est en votre avantage !

Pour notre projet nous allons avoir besoin d'un dossier de travail. Pour ma pars j'ai placé à la racine du disque principal un dossier nommé Workspace dans lequel j'ai ensuite créé un dossier nommé ionic. Rendez-vous dans votre dossier de travail et restez appuyé sur CTRL+SHIFT + clique droit. Dans le menu contextuel choisissez  **Ouvrir une fenêtre de commandes ici **

Nous allons effectuer l'installation de Ionic via NPM (Node Package Manager) pour cela exécuter la commande suivante :



```text
npm install -g cordova ionic
```

Une fois Ionic installé nous allons créer notre projet à partir d'un template existant de Ionic :



```text
ionic start MonAppTuto blank --v2
```

Cette commande va créer un nouveau dossier du nom de notre application et y installer tout ce qui est nécessaire. Pour la suite du tutoriel placez-vous en ligne de commande dans le dossier de l'application :



```text
cd MonAppTuto
```

Avant de démarrer notre projet sous Ionic, il est important d'installer l'API de ZetaPush :



```text
npm install zetapush-js -save
npm install zetapush-angular --save
```

La documentation fournit beaucoup d'exemples : [Documentation API for JavaScipt](https://doc.zetapush.com/api/javascript/)

Rendez-vous dans le dossier où est installé le projet puis dans le dossier SRC afin de modifier le fichier declarations.d.ts

Il nous faut déclarer les modules que nous allons utiliser, pour cela remplacer le fichier declaration.d.ts situé dans le dossier src avec celui disponible sur  [GitHub](https://github.com/high54/Mangatheque)

Une fois les manipulations terminée, exécutez la commande suivante :



```text
ionic serve --lab
```

Cette commande va démarrer le serveur et nous permettre d'avoir un rendu en temps réel de notre application depuis votre navigateur web. À chaque sauvegarde d'un fichier, l'affichage sera automatiquement mis à jour.

C'est d'ailleurs votre navigateur qui doit s'ouvrir à l'instant. Il vous est possible de choisir en haut à droit le rendu sous les différents OS pour smartphone pris en charge par Ionic.

## Création du projet sous Eclipse

Dans un premier temps il va nous falloir un identifiant et pour cela il suffit de créer un compte gratuitement sur  [ZetaPush](https://admin.zpush.io/#/register) . Une fois votre compte créé, rendez-vous dans l'administration et dans le menu de gauche All Sandboxes. Cliquez ensuite sur le signe + au centre de la page pour ajouter une sandbox. Entrez les informations Nom et Description puis choisissez dans Cluster : free.

![](./images/SandBoxZMS-300x182.png)

Il ne vous reste plus cas récupérer l'id de votre Sandbox :

![](./images/IdSandBoxZMS-300x18.png)

Une fois vos informations de connexion à ZetaPush et votre SendBox ID récupéré nous pouvons créer un nouveau projet sous Eclipse,

File → New → Other → ZetaPush → ZMS Recipe

Remplissez les informations Developper login et password avec vos informations de connexion à l'administration du site ZetaPush et la SandBox ID que nous venons de récupérer,

Pour le Recipe Name j'ai choisis de mettre com,whyme,apptuto

Server Type : STD

Sélectionnez le service à inclure, Ici RDBMS pour Relational Database : SQL storage

# Mise en place de la base de données

Inutile de chercher un hébergement de base de données en ligne nous allons utiliser celui proposé par ZetaPush. Il est aussi possible d'utiliser du NoSQL, mais nous allons rester sur du classique SQL.

## Architecture de notre base de données

Pour gérer notre collection il nous faudra des articles. Des BDs, Mangas, vidéos ect…

Nous utiliserons des Mangas pour cette collection.

Voici les tables de la Mangathèque :

Voici globalement les tables dont nous aurons besoin afin de réaliser l'application.

## Création des tables

Pour créer les tables sous ZMS, c'est très simple !

Les services dont nous allons avoir besoin ont été directement créés lors de la configuration de notre projet sous Eclipse. C'est d'ailleurs dans cet éditeur que nous allons créer nos tables. Pour cela, rendez-vous dans le fichier  init.zms  c'est lui qui va nous permettre de configurer notre base de données. Vous pouvez supprimer tout son contenu, nous n'en n'avons pas besoin, il est présent pour vous fournir des exemples d'utilisation prêt à l'emploi.

Le service de base de données étant créé dans le fichier recipe.zms nous pouvons y faire appel :



```text
database.rdbms_ddl({statement :'NOTRE CODE ICI'}) ;
```

C'est donc dans ces simples quottes que nous allons effectuer nos requêtes SQL comme sur un serveur classique.

Voici le code de création de nos tables :



```text
database.rdbms_ddl({statement : '
CREATE TABLE IF NOT EXISTS mangas (
 id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 titre VARCHAR(150) NOT NULL,
 tome INT NOT NULL,
 resume TEXT NULL,
 idSerie INT NOT NULL,
 isLu TINYINT(1) NOT NULL,
 isAcquis TINYINT(1) NOT NULL
)'});

database.rdbms_ddl({statement : '
CREATE TABLE IF NOT EXISTS series (
 id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nom VARCHAR(150) NOT NULL,
 resume TEXT NULL
)'});
```

Il ne nous reste plus qu'à déployer notre code sur le serveur via le bouton rouge en forme de fusée dans la barre d'outils :

![](./images/outilsZMS.png)

Si tout s'est bien passé, vous devriez avoir dans la console un joli success :



```text
[INFO] ***************************
[INFO] **        SUCCESS        **
[INFO] ***************************
```

ZetaPush a déployé pour vous une base de données dans laquelle vos tables ont été créées,

# Ajout - Récupération - Mise à jour et Suppression

## ZetaPush MacroScript - ZMS

Maintenant que nous avons notre base de données il est temps de mettre en place notre CRUD (Create, Read, Update, Delete). Pour cela sous Eclipse créez un nouveau fichier dans le dossier src de notre projet.

Clic droit sur le dossier src -> New -> File 

** File name **  : MangaMacro.zms

N'oubliez pas l'extension du fichier en.zms !

Nous allons créer des MacroScript pour chacune de nos méthodes du CRUD :

Voici la base d'une MacroScript :



```text
macroscript NomDeLaMethode()
{
    
}
```

N'hésitez surtout pas à vous rendre sur la  [documentation de ZetaPush](https://zetapush.github.io/zetapush-js/class/lib/mapping/services.js~Macro.html)

Et voici nos macros pour tout le CRUD des Mangas :

Pour plus de lisibilité j'ai volontairement fait des retours à la ligne après certain paramètre.



```text
/**
* Ajout d'un nouveau manga dans la base de donnée
*/
macroscript MangaInsert(
 @NotNull string titre,
 @NotNull number tome,
 string resume,
 @NotNull number idSerie,
 @NotNull boolean isLu,
 @NotNull boolean isAcquis
)
{
@@(database) INSERT INTO mangas (titre,tome,resume,idSerie,isLu,isAcquis) VALUES (:{titre},:{tome},:{resume},:{idSerie},:{isLu},:{isAcquis});
var id = @@(database) SELECT id FROM mangas WHERE id= LAST_INSERT_ID();
} return { id }

/**
* Récupération de tout les mangas d'une série
*/
macroscript MangaGetAll(@NotNull number idSerie)
{
 var mangas = @@(database) SELECT * FROM mangas WHERE idSerie = :{idSerie};
} return { mangas }

/**
* Récupération d'un manga via sont identifiant unique
*/
macroscript MangaGetById(@NotNull number idManga)
{
var manga = @@(database) SELECT * FROM mangas WHERE id = :{idManga};
} return { manga } 

/**
* Mise à jour d'un manga
*/
macroscript MangaUpdateById(@NotNull number idManga,
 @NotNull string titre,
 @NotNull number tome,
 string resume,
 @NotNull number idSerie,
 @NotNull boolean isLu,
 @NotNull boolean isAcquis
)
{
@@(database) UPDATE mangas SET titre = :{titre}, tome = :{tome}, resume = :{resume}
 ,idSerie=:{idSerie},isLu = :{isLu}, isAcquis=:{isAcquis} 
 WHERE id = :{idManga};
}
/**
* Suppression d'un manga
*/ 
macroscript MangaDeleteById(@NotNull number idManga)
{
@@(database) DELETE FROM mangas WHERE id = :{idManga};
}
```

Nous réalisons toutes les opérations de base, c'est à dire : L'ajout, la modification, la lecture et la suppression de donnée dans la base de données.

  
 Comme vous pouvez le remarquer, il est possible de typer les paramètres (string, number, boolean) et de mettre des annotations comme  **@NotNull**  afin de rendre le paramètre obligatoire.

Plus de détails sur les annotations et les Macros :  [https://ref.zpush.io/](https://ref.zpush.io/)   un petit CTRL + F sur la page avec comme recherche  **@NotNull** , vous y trouverez un tableau des différentes annotations, ainsi qu'un exemple pour réaliser les vôtres !

En ce qui concerne les variables, pour les inclure dans nos requêtes SQL nous les encapsulons **:{variable}** 

L'utilisation du service de base de données est indiquée de la manière suivante :  **@@(database)**  suivit de la requête SQL.

Nous récupérons les informations dans  **INSERT**  et  **SELECT**  via une variable classique **var maVariable = **

Pour retourner les informations nous utilisons simplement un  **return { maVariable }**  cela renvoie les données à l'appareil qui en a fait la demande. Pour renvoyer les données à tous les appareils connectés d'un utilisateur il suffit de remplacer  **return**  par  **broadcast{ maVariable } **

**Il est possible d'utiliser ** **on channel __selfname ** **ou 'NomDuneAutreMacro'. Mais pour plus de détails consulter la documentation : ** [https://ref.zpush.io/#main_macros_Syntax](https://ref.zpush.io/#main_macros_Syntax)

L'intégralité des Macros de l'application est disponible sur [GitHub / ZMS](https://github.com/high54/Mangatheque) 

## Modèles

Maintenant que nous avons nos Macros, il est nécessaire d'avoir des modèles,

Sous Atom, créer un nouveau dossier à la base de src nommé models. Vous pouvez directement créer les fichiers manga-model.ts et serie-model.ts

Voici le contenu de manga-model :



```typescript
export class MangaModel {
 /**
 * Properties 
 */
 private id: number;
 private titre: string;
 private tome: number;
 private resume: string;
 private idSerie: number;
 private isLu: boolean;
 private isAcquis: boolean;


 /**
 * Getter
 */
 public GetId(): number {
 return this.id
 }
 public GetTitre(): string {
 return this.titre;
 }
 public GetTome(): number {
 return this.tome;
 }
 public GetIdSerie(): number {
 return this.idSerie;
 }
 public GetIsLu(): boolean {
 return this.isLu;
 }
 public GetIsAcquis(): boolean {
 return this.isAcquis;
 }

 /**
 * Setter
 */
 public SetId(id: number) {
 this.id = id;
 }
 public SetTitre(titre: string) {
 this.titre = titre;
 }
 public SetTome(tome: number) {
 this.tome = tome;
 }
 public SetIdSerie(idSerie: number) {
 this.idSerie = idSerie;
 }
 public SetIsLu(isLu: boolean) {
 this.isLu = isLu;
 }
 public SetIsAcquis(isAcquis: boolean) {
 this.isAcquis = isAcquis;
 }

 public constructor() {}
}
```

Il s'agit d'un modèle classique, rien de particulier ici.

Voici le modèle pour les séries :



```typescript
export class SerieModel {
    /**
    * Properties
    */
    private id: number;
    private nom: string;
    private resume: string;

    /**
    * Getter
    */
    public GetId(): number {
        return this.id;
    }
    public GetNom(): string {
        return this.nom;
    }
    public GetResume(): string {
        return this.resume;
    }

    /**
    * Setter
    */
    public SetId(id: number) {
        this.id = id;
    }
    public SetNom(nom: string) {
        this.nom = nom;
    }
    public SetResume(resume: string) {
        this.resume = resume;
    }

    public constructor() { }
}
```

Tous les modèles sont disponible dans [src / models  du GitHub](https://github.com/high54/Mangatheque).

## Providers

Il est temps de lier les MacroScripts à notre application. 

Afin de pouvoir traiter nos données avec la base de données nous allons créer des Providers.

Pour plus de clarté chaque objet aura son Provider. Dans une invite de commande exécuter les lignes de commandes suivantes : 



```text
ionic g provider manga-provider
ionic g provider serie-provider
ionic g provider client-provider
```

Les Providers ont été crée dans le dossier providers.

Vous pouvez supprimer le contenu, nous allons éditer notre propre provider.

Serie-provider :



```typescript
import { services } from 'zetapush-js';


export class SerieProvider extends services.Macro {

    SerieInsert(nom, resume) {
        return this.$publish('SerieInsert', { nom, resume });
    }
    SerieGetAll() {
        return this.$publish('SerieGetAll', {});
    }
    SerieGetById(idSerie) {
        return this.$publish('SerieGetById', { idSerie });
    }
    SerieUpdateById(idSerie, nom, resume) {
        this.$publish('SerieUpdateById', { idSerie, nom, resume })
    }
    SerieDeleteById(idSerie) {
        this.$publish('SerieDeleteById', { idSerie });
    }
}
```

Manga-provider :



```typescript
import { services } from 'zetapush-js';

export class MangaProvider extends services.Macro {

 MangaInsert(titre, tome, resume, idSerie, isLu, isAcquis) {
 return this.$publish('MangaInsert', { titre, tome, resume, idSerie, isLu, isAcquis });
 }
 MangaGetAll(idSerie) {
 return this.$publish('MangaGetAll', { idSerie });
 }
 MangaGetById(idManga) {
 return this.$publish('MangaGetById', { idManga })
 }
 MangaUpdateById(idManga, titre, tome, resume, idSerie, isLu, isAcquis) {
 this.$publish('MangaUpdateById', { idManga, titre, tome, resume, idSerie, isLu, isAcquis });
 }
 MangaDeleteById(idManga) {
 this.$publish('MangaDeleteById', { idManga })
 }
}
```

Voici le schéma type de nos providers. Tout d'abord nous importons le module **services** de ZetaPush, puis notre class étend celle des Macro de services.

Ensuite nous créons des méthodes MangaInsert() etc. Celle-ci prend les mêmes paramètres que nos Macros. 

Dans ces méthodes, si nous avons des informations à renvoyer à notre application, par exemple tous les mangas et les séries, nous utilisons simplement un  **return**  ce qui nous permettra de souscrire à ces méthodes dans l'attente du retour des informations.

Ensuite nous utilisons  **this.$publish()**  afin de faire appel aux services de ZetaPush avec comme paramètres entre simple guillemet le nom de la Macro visé  **‘MaMacro'** . Puis après la virgule un tableau avec nos paramètres à renvoyer :  **{param1, param2, param3}**  etc.

Nous avons besoin d'un Singleton pour nous connecter à ZetaPush, nous en faisons aussi un provider :



```typescript
import { SmartClient } from 'zetapush-js';

export class ClientProvider {
 client: SmartClient;

 public getInstance() {
 if (typeof this.client === "undefined" && this.client == null) {
 this.client = new SmartClient({
 sandboxId: 'MA SANDBOX ID',
 apiUrl: 'https://api.zpush.io/'
 })
 }
 return this.client;
 }
}
```

Le Client va nous permettre de nous connecter à ZetaPush et de nous identifier aux services via un identifiant unique auto généré par le service .

Il prend en paramètre l'id de votre sandbox ainsi que l'url de l'API de ZetaPush.

En ce qui concerne le ClientProvider, nous devons le déclarer dans le fichier app/app.module.ts :



```typescript
import { ClientProvider } from '../providers/client-provider';

.....
 providers: [
    ...
    ClientProvider,
    ...
  ]
```

Tous les providers sont disponibles sur [src / providers GitHub](https://github.com/high54/Mangatheque)

# Interface Utilisateur : Gestion des séries

Nous avons principalement configuré notre espace de travail et mis en place la communication avec la base de données. Maintenant il est temps de mettre en place notre interface utilisateur.

## Page Home

La page Home va nous permettre d'afficher la liste des séries ainsi qu'un bouton renvoyant sur une page avec un formulaire d'ajout de série :

home.ts



```typescript
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
@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {

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

 constructor(public navCtrl: NavController, private client: ClientProvider, private menu: MenuController, private modalCtrl: ModalController, public alertCtrl: AlertController) {
 this.client.getInstance().connect();
 this.menu.enable(false);
 this.connect();
 }

 showManga(serie) {
 this.navCtrl.push(MangasPage, { serie: serie });
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
 this.serieService.SerieGetAll().then((result) => {
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
 connect() {
 this.client.getInstance().addConnectionStatusListener({
 onConnectionEstablished: () => {
 this.showSerie();
 },
 onFailedHandshake: error => {
 console.error(error)
 },
 onConnectionClosed: () => {
 this.client.getInstance().connect();
 }
 });
 }
 editSerie(serie) {
 let modal = this.modalCtrl.create(UpdateSeriePage, { serie: serie });
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
 title: 'Voulez-vous supprimer cette série ainsi que tous les mangas ?',
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
```

Home.ts :

Tout d'abord nous importons ce dont nous avons besoin. Model, Provider et Client de connexion. Ensuite dans notre classe nous déclarons une variable serieService faisant référence à notre provider-Singleton Client afin de créer un service Asynchrone. Celui-ci prend en paramètre le type de service, ici : **SerieProvider** et le nom du service coté ZetaPush, ici nous utilisons notre service de Macro :** ‘macro_0'**. 

À l'heure actuelle, il est important de caster notre variable service en Provider : **as SerieProvider**

**serieService** va nous permettre d'appeler toutes nos méthodes du Provider.

Ensuite dans le constructeur nous déclarons le Client Provider : (**private client : ClientProvider**) et l'utilisons directement afin de nous connecter à ZetaPush : **this.client.getInstance().connect();**

addSerie() => Nous permet d'afficher la surcouche avec le formulaire d'ajout d'une nouvelle série

groupSerie()=> Trie et regroupe les séries par ordre alphabétique pour l'affichage

showSerie()=> Effectue l'appelle à la macro SerieGetAll(). Grâce à Then() nous souscrivons et dès réception des données, nous les traitons dans notre application.

editSerie()=> Affiche la surcouche pour modifier une série

deleteSerie()=> Supprime une série

home.html



```html
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>Mangathèque</ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="addSerie()"><ion-icon name="add"></ion-icon></button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item-group *ngFor="let group of groupedSeries">
      <ion-item-divider color="light">{{group.letter}}</ion-item-divider>
      <ion-item-sliding *ngFor="let serie of group.series">

        <ion-item (click)="showManga(serie)">
          {{serie.nom}}
        </ion-item>

        <ion-item-options>

          <button ion-button icon-only (click)="editSerie(serie)" color="light">
        <ion-icon name="paper"></ion-icon>
      </button>

          <button ion-button icon-only (click)="showConfirm(serie)" color="danger">
        <ion-icon name="trash"></ion-icon>
      </button>

        </ion-item-options>

      </ion-item-sliding>
    </ion-item-group>
  </ion-list>

</ion-content>
```

Voici le résultat que vous devriez avoir :

![](./images/mgtheq1-170x300.png)

## Ajout de série

Pour chaque ajout de page que nous ferons à l'avenir il est important de faire la déclaration dans la fichier src/app/app.module.ts

Nous allons générer une nouvelle page afin de permettre l'ajout de série à l'utilisateur :



```text
Ionic g page add-serie-page
```

Une fois la commande exécutée, veuillez ajouter la page dans le fichier app.module.ts de la manière suivante :

## Déclaration d'une page dans le fichier app.module.ts

Effectuer l'import de cette page :



```typescript
import { AddSeriePage } from '../pages/add-serie/add-serie';
```

Ensuite ajouter la page dans declarations et entryComponents :



```typescript
declarations: [
     ....
    AddSeriePage,
     ....
  ],  
entryComponents: [
     ....
    AddSeriePage,
    .....
  ],
```

## Erreur lors de la génération d'une page sous Ionic 3

À l'heure actuelle lors de la génération d'une page avec Ionic 3 il est possible de rencontrer une erreur dans le fichier « ma-page.module.ts » situé dans le dossier de la page.

Dans ce cas veuillez procéder ainsi :

1 - Remplacer l'import du module IonicModule par IonicPageModule comme ceci :



```typescript
import { IonicPageModule } from 'ionic-angular';
```

2 - Puis modifier le nom du module dans la partie @NgModule ({ imports:[



```typescript
imports: [
    IonicPageModule.forChild(MaPage),
  ],
```

Je ne reviendrais pas sur la déclaration d'une page ou la correction du bug lors de la génération. N'oubliez surtout pas la déclaration pour chacune des pages que nous générerons !

Voici enfin le contenu de notre page add série :

add-serie-page.ts



```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// Import du model des séries ainsi que du provider
import { SerieModel } from '../../models/serie-model';
import { SerieProvider } from '../../providers/serie-provider';

// Import du client afin d'établire une connexion avec ZetaPush
import { ClientProvider } from '../../providers/client-provider';


@IonicPage()
@Component({
    selector: 'page-add-serie',
    templateUrl: 'add-serie.html',
})
export class AddSeriePage {
    private serieService = this.client.getInstance().createAsyncMacroService({
        Type: SerieProvider,
        deploymentId: 'macro_0'
    }) as SerieProvider;
    private nom: string = "";
    private resume: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private client: ClientProvider) {
    }

    saveSerie() {
        if (this.nom.length > 0) {
            let serie = new SerieModel();
            serie.SetNom(this.nom);
            serie.SetResume(this.resume);
            this.serieService.SerieInsert(serie.GetNom(), serie.GetResume()).then((result) => {
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
```

Add-serie-page.html :



```html
<ion-header>

  <ion-navbar>
    <ion-title>Ajouter une série</ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
</button>
    </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>
<ion-item>
<ion-label>Nom</ion-label>
<ion-input type="text" [(ngModel)]="nom" name="nom"></ion-input>
</ion-item>
<ion-item>
<ion-label>Resumé</ion-label>
<ion-input type="text" name="resume"></ion-input>
</ion-item>
<button ion-button block (click)="saveSerie()">Enregistrer</button>
<button ion-button color="danger" block (click)="dismiss()">Annuler</button>
</ion-content>
```

Cette page fournits un formulaire permettant l'ajout d'une série. Rien de particulier, la méthode principale qui permet la sauvegarde en base de données renvoie lors de la fermeture de la surcouche un objet Serie afin de l'ajouter à la liste et rafraîchir l'affichage. Cela évite de devoir faire appel de nouveau à notre base de données.

## Mise à jour d'une série

L'utilisateur n'est jamais parfait ! Il est donc indispensable de lui proposer un formulaire pour modifier une série s'il a une erreur lors de la création. Ou tout simplement parce qu'il a fait un oubli.



```text
ionic g page update-serie-page
```

Update-serie-page.ts



```typescript
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
```

Update-serie.html :



```html
<ion-header>

  <ion-navbar>
    <ion-title>Editer une série</ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
</button>
    </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>
  <ion-item>
    <ion-label>Nom</ion-label>
    <ion-input type="text" [(ngModel)]="nom" name="nom"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Resumé</ion-label>
    <ion-input type="text" [(ngModel)]="resume" name="resume"></ion-input>
  </ion-item>
  <button ion-button block (click)="saveSerie()">Enregistrer</button>
  <button ion-button color="danger" block (click)="dismiss()">Annuler</button>
</ion-content>
```

Nous affichons le même formulaire que lors de l'ajout. Cependant nous affichons les informations de la série à éditer. Pour cela nous récupérons une objet série transmit lors de l'appel de la surcouche dans la page home.ts.

La fonction principale saveSerie() est presque identique à la précédent, celle utilisée lors de l'ajout d'une série. Sauf que celle-ci fait référence à notre MacroScript de modification d'une série (SerieUpdateById)

À ce stade vous êtes armé pour réaliser l'ajout/modification/affichage et suppression des mangas. Mais je vous donne tout de même le code !

# Interface Utilisateur : Gestion des mangas

Il est temps de passer à la gestion des mangas !

## Affichage des mangas d'une série

Tout d'abord, nous allons ajouter une page mangas :



```text
ionic g page mangas-page
```

Cette page va afficher tous les mangas d'une série, les ordonner par tome car un utilisateur peut enregistrer le tome 24 avant le tome 1 donc ordonner par id est une mauvaise idée,

Il y aura globalement les mêmes options que la gestion de série : L'ajout, la modification et la suppression.

mangas-page.ts :



```typescript
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
 this.showManga();
 }

 showManga() {
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
 this.showManga();
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
```

Mangas-page.html



```html

<ion-header>

  <ion-navbar>
    <ion-title>{{serie.GetNom()}}</ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="addManga()"><ion-icon name="add"></ion-icon></button>
    </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <ion-card *ngFor="let manga of mangas" (click)="viewManga(manga)">
    <ion-item>
  <h2>{{manga.titre}}</h2>
  <p>Tome n° {{manga.tome}}</p>
</ion-item>
    <ion-card-content>
      <ion-row no-padding>
        <ion-col>
          <button ion-button clear small color="danger" (click)="editManga(manga)" icon-left>
            <ion-icon name='paper'></ion-icon>
            Edit
          </button>
        </ion-col>
        <ion-col text-center>
          <button ion-button clear small (click)="showConfirm(manga)" color="danger" icon-left>
            <ion-icon name='trash'></ion-icon>
            Delete
          </button>
        </ion-col>
      </ion-row>
    </ion-card-content>
  </ion-card>

</ion-content>
```

## Ajouter un manga



```text
ionic g page add-manga-page
```

Add-manga-page.ts



```typescript
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
```

Add-manga-page.html



```html
<ion-header>

  <ion-navbar>
    <ion-title>Ajouter un manga</ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
</button>
    </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <ion-item>
    <ion-label>Titre</ion-label>
    <ion-input type="text" [(ngModel)]="titre" name="titre"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Tome n°</ion-label>
    <ion-input type="text" [(ngModel)]="tome" name="tome"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Résumé</ion-label>
    <ion-input type="text" [(ngModel)]="resume" name="resume"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label> Déjà lu ?</ion-label>
    <ion-toggle name="isLu" [(ngModel)]="isLu" checked="false"></ion-toggle>
  </ion-item>
  <ion-item>
    <ion-label> Déjà acheté ?</ion-label>
    <ion-toggle name="isAcquis" [(ngModel)]="isAcquis" checked="false"></ion-toggle>
  </ion-item>
  <button ion-button block (click)="saveManga()">Enregistrer</button>
  <button ion-button color="danger" block (click)="dismiss()">Annuler</button>
</ion-content>
```

## Mise à jour d'un manga



```text
ionic g page update-manga-page
```

Update-manga-page.ts



```typescript
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
```

Update-manga-page.html



```html
<ion-header>
  <ion-navbar>
    <ion-title>Modifier un manga</ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
</button>
    </ion-buttons>
  </ion-navbar>
</ion-header>


<ion-content padding>
  <ion-item>
    <ion-label>Titre</ion-label>
    <ion-input type="text" [(ngModel)]="titre" name="titre"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Tome n°</ion-label>
    <ion-input type="text" [(ngModel)]="tome" name="tome"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Résumé</ion-label>
    <ion-input type="text" [(ngModel)]="resume" name="resume"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label> Déjà lu ?</ion-label>
    <ion-toggle name="isLu" [(ngModel)]="isLu" checked="false"></ion-toggle>
  </ion-item>
  <ion-item>
    <ion-label> Déjà acheté ?</ion-label>
    <ion-toggle name="isAcquis" [(ngModel)]="isAcquis" checked="false"></ion-toggle>
  </ion-item>
  <button ion-button block (click)="saveManga()">Enregistrer</button>
  <button ion-button color="danger" block (click)="dismiss()">Annuler</button>
</ion-content>
```

La page mangas se comporte exactement comme Home. Les pages add-manga et update-manga sont disponible sur  [GitHub](https://github.com/high54/Mangatheque)

Voici le résultat que vous devriez avoir :

![](./images/mgtheq2-171x300.png)

# Conclusion

Nous avons passé la plus grande partie du temps à configurer l'environnement ou à modifier le projet sous Ionic.

L'environnement de travail nous n'y toucherons pas tous les deux jours, c'est du temps perdu hors réalisation du projet.   
 Déléguer à ZetaPush la gestion de notre base de données s'est fait tout seul et nous avons gagné un temps précieux. Comme vous avez pu le constater, déployer un serveur de base de données SQL et créer des tables a pris beaucoup moins de temps que par la voie classique et cela est très simple d'utilisation. C'est là le point fort de ZetaPush qui propose des services serverless, il suffit de quelques lignes sous Eclipse pour déployer un service prêt à utiliser en le paramétrant simplement.

ZetaPush dispose aussi de briques plus haut niveau pour mettre en place des outils (Visioconférence, Forum, Tchat/vidéo/audio) à notre application en quelques instants. Je vous montrerai ça lors d'un prochain tutoriel.

