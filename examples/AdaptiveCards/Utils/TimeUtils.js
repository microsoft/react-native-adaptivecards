import { StringUtils } from './StringUtils';
export class TimeUtils {
    static getFileTime() {
        return (new Date()).getTime();
    }
    static isDate(value) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }
    static isTime(value) {
        return /^\d{2}\:\d{2}$/.test(value);
    }
    static extractDate(value) {
        if (TimeUtils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return new Date();
    }
    static isValidDate(year, month, day) {
        return (month > 0 && month < 13 &&
            year && year.toString().length === 4 &&
            day > 0 &&
            day <= (new Date(year, month, 0)).getDate());
    }
    static isValidTime(hour, minute, second) {
        return (hour >= 0 && hour < 24
            && minute >= 0 && minute < 60
            && second >= 0 && second < 60)
            || (hour === 24 && minute === 0 && second === 0);
    }
    static convertTime(time) {
        let parts = time.split(':');
        let nHour = Number(parts[0]);
        let nMinute = Number(parts[1]);
        if (!TimeUtils.isValidTime(nHour, nMinute, 0)) {
            return time;
        }
        let part = nHour < 12 ? 'AM' : 'PM';
        nHour = nHour % 12 || 12;
        let hour = (nHour + '').length === 1 ? `0${nHour}` : nHour + '';
        let minute = (nMinute + '').length === 1 ? `0${nMinute}` : nMinute + '';
        return (`${hour}:` +
            `${minute} ` +
            `${part}`);
    }
    static extractTime(value) {
        if (TimeUtils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return new Date();
    }
    static getDateString(date) {
        if (date) {
            return (`${StringUtils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`);
        }
        return undefined;
    }
    static getTimeString(date) {
        if (date) {
            return TimeUtils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }
    static composeTimeString(hour, minute) {
        return (`${StringUtils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${StringUtils.prettifyString(minute.toString(), '0', 2, 'pre')}`);
    }
}
