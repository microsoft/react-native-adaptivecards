import { StringUtils } from './StringUtils';
export class TimeUtils {
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
        return undefined;
    }
    static extractTime(value) {
        if (TimeUtils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
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
