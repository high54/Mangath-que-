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
    public GetResume(): string {
        return this.resume;
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
    public SetResume(resume: string) {
        this.resume = resume;
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
