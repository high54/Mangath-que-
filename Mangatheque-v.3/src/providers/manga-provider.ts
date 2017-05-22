
import { services } from 'zetapush-js';

export class MangaProvider extends services.Macro {

    MangaInsert(titre, tome, resume, idSerie, isLu, isAcquis,couverture) {
      return  this.$publish('MangaInsert', { titre, tome, resume, idSerie, isLu, isAcquis, couverture });
    }
    MangaGetAll(idSerie) {
        return this.$publish('MangaGetAll', { idSerie });
    }
    MangaGetById(idManga) {
        return this.$publish('MangaGetById', { idManga })
    }
    MangaUpdateById(idManga, titre, tome, resume, idSerie, isLu, isAcquis,couverture) {
        this.$publish('MangaUpdateById', { idManga, titre, tome, resume, idSerie, isLu, isAcquis, couverture });
    }
    MangaDeleteById(idManga) {
        this.$publish('MangaDeleteById', { idManga })
    }


}
