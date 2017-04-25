export class CouvertureModel {
    /**
    * Properties
    */
    private idManga: number;
    private fichier: string;

    /**
    * Getter
    */
    public GetIdManga(): number {
        return this.idManga;
    }
    public GetFichier(): string {
        return this.fichier;
    }

    /**
    * Setter
    */
    public SetIdManga(idManga: number) {
        this.idManga = idManga;
    }
    public SetFichier(fichier: string) {
        this.fichier = fichier;
    }

    /**
    * Constructeur vide
    */
    public constructor() { }
}
