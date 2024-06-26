import dayjs from 'dayjs';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/duration';

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.locale('');
export default class DateFormatter {
    static complete(date: Date) {
        return dayjs(date).format('dddd DD MMMM YYYY');
    }
}