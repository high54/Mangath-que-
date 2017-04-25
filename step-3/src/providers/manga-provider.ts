
import { services } from 'zetapush-js';

export class MangaProvider extends services.Macro {

    MangaInsert(titre, tome, resume, idSerie, isLu, isAcquis) {
      return  this.$publish('MangaInsert', { titre, tome, resume, idSerie, isLu, isAcquis });
    }
    MangaGetAll(idSerie) {
        return this.$publish('MangaGetAll', { idSerie });
    }
    MangaGetById(idManga) {
        return this.$publish('MangaGetById', { idManga })
    }
    MangaUpdateById({ idManga, titre, tome, resume, idSerie, isLu, isAcquis }) {
        this.$publish('MangaUpdateById', { idManga, titre, tome, resume, idSerie, isLu, isAcquis });
    }
    MangaDeleteById({ idManga }) {
        this.$publish('MangaDeleteById', { idManga })
    }


}
