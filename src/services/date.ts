import dayjs from 'dayjs'; 
import 'dayjs/plugin/utc'; 
import 'dayjs/plugin/duration';
import 'dayjs/locale/fr'; 

// Extension de dayjs avec les plugins nécessaires
dayjs.extend(require('dayjs/plugin/utc')); // Extension de dayjs avec le plugin UTC
dayjs.extend(require('dayjs/plugin/duration')); // Extension de dayjs avec le plugin Duration
dayjs.locale('fr'); // Configuration de dayjs pour utiliser la langue française

// Déclaration de la classe DateFormatter pour formater les dates
export default class DateFormatter {
    
    // Méthode statique qui convertit un objet Date en un objet dayjs
    static toDayjs(date: Date) {
        return dayjs(date); // Conversion de l'objet Date en un objet dayjs
    }

    // Méthode statique pour formater une date complète
    static complete(date: Date) {
        // Utilisation de la méthode toDayjs pour convertir la date puis formatage en chaîne de caractères
        return this.toDayjs(date).format('dddd DD MMMM YYYY à HH') + 'h';
        // Le format produit une chaîne telle que "lundi 01 janvier 2024 à 12h"
    }
}
