import { services } from 'zetapush-js';


export class SerieProvider extends services.Macro {

    SerieInsert(nom, userKey, resume?) {
        return this.$publish('SerieInsert', { nom,userKey, resume });
    }
    SerieGetAll(userKey) {
        return this.$publish('SerieGetAll', {userKey});
    }
    SerieGetById(idSerie) {
        return this.$publish('SerieGetById', { idSerie });
    }
    SerieUpdateById(idSerie, nom, resume?) {
        this.$publish('SerieUpdateById', { idSerie, nom, resume })
    }
    SerieDeleteById(idSerie) {
        this.$publish('SerieDeleteById', { idSerie });
    }
}
