import { StringUtils } from './StringUtils';

export class TimeUtils {
    public static getFileTime() {
        return (new Date()).getTime();
    }

    public static isDate(value: string) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }

    public static isTime(value: string) {
        return /^\d{2}\:\d{2}$/.test(value);
    }

    public static extractDate(value: string) {
        if (TimeUtils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return undefined;
    }

    public static isValidDate(year: number, month: number, day: number) { 
        return (
            month > 0 && month < 13 &&
            year && year.toString().length === 4 &&
            day > 0 &&
            // Is it a valid day of the month?
            day <= (new Date(year, month, 0)).getDate()
        );
    }

    public static isValidTime(hour: number, minute: number, second: number) {
        return hour >= 0 && hour < 24 
            && minute >= 0 && minute < 60 
            && second >= 0 && second <= 60; 
    }

    public static convertTime(time: string): string {
        let parts: string[] = time.split(':');
        let nHour: number = Number(parts[0]);
        let nMinute: number = Number(parts[1]);

        if (!TimeUtils.isValidTime(nHour, nMinute, 0)) {
            // do nothing if time format is invalid
            return time;
        }

        let part: string = nHour < 12 ? 'AM' : 'PM';
        nHour = nHour % 12 || 12;
        let hour: string = (nHour + '').length === 1 ? `0${nHour}` : nHour + '';
        let minute: string = (nMinute + '').length === 1 ? `0${nMinute}` : nMinute + '';
        return (
            `${hour}:` +
            `${minute} ` +
            `${part}`
        );
    }

    public static extractTime(value: string) {
        if (TimeUtils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
    }

    public static getDateString(date: Date) {
        if (date) {
            return (
                `${StringUtils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${StringUtils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`
            );
        }
        return undefined;
    }

    public static getTimeString(date: Date) {
        if (date) {
            return TimeUtils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }

    public static composeTimeString(hour: number, minute: number) {
        return (
            `${StringUtils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${StringUtils.prettifyString(minute.toString(), '0', 2, 'pre')}`
        );
    }
}
