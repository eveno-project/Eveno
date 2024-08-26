import dayjs from 'dayjs';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/duration';
import 'dayjs/locale/fr';

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.locale('fr');
export default class DateFormatter {
    static toDayjs(date: Date) {
        return dayjs(date);
    }

    static complete(date: Date) {
        return this.toDayjs(date).format('dddd DD MMMM YYYY à HH');
    }
}