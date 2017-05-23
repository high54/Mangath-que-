
import { services } from 'zetapush-js';

export class CouvertureProvider extends services.Macro {

  /** Demande une URL pour l'upload */
  uploadFile(path) {
    return this.$publish('uploadFile',{path});
  }
  /** Récupération de tout les fichiers */
  listFiles(folder) {
    return this.$publish('listFiles',{folder});
  }

  /** Déclaration d'une macro appelée après l'upload effectif d'un fichier */
  addFile(guid) {
    return this.$publish('addFile',{guid});
  }
  deleteFile(path)
  {
    return this.$publish('deleteFile',{path});
  }

}
