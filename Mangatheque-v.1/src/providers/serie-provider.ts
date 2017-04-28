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
