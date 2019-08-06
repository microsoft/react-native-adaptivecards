import { TimeUtils } from '../../../Utils/TimeUtils';
import { NormalizeDate } from './MarkdownTypes';
var DateType;
(function (DateType) {
    DateType[DateType["COMPACT"] = 0] = "COMPACT";
    DateType[DateType["SHORT"] = 1] = "SHORT";
    DateType[DateType["LONG"] = 2] = "LONG";
    DateType[DateType["TIME"] = 3] = "TIME";
})(DateType || (DateType = {}));
const DATE = '(\\d{4})-(\\d{2})-(\\d{2})';
const TIME = '(\\d{2}):(\\d{2})?:(\\d{2})(\\.\\d+)?($|Z|([+-])(\\d{2}):(\\d{2})?)';
const DATE_TIME = DATE + 'T' + TIME;
const DATE_PREFIX = '\\{\\{DATE\\(';
const TIME_PREFIX = '\\{\\{TIME\\(';
const LONG = '(,(|\\s)LONG)';
const SHORT = '(,(|\\s)SHORT)';
const COMPACT = '(|(,(|\\s)COMPACT))';
const TAIL = '\\)\\}\\}';
const COMPACT_DATE = new RegExp(DATE_PREFIX
    + DATE_TIME
    + COMPACT
    + TAIL);
const SHORT_DATE = new RegExp(DATE_PREFIX
    + DATE_TIME
    + SHORT
    + TAIL);
const LONG_DATE = new RegExp(DATE_PREFIX
    + DATE_TIME
    + LONG
    + TAIL);
const TIME_WITH_ZONE = new RegExp(TIME_PREFIX
    + DATE_TIME
    + TAIL);
export class RFC3339Date {
    static getMonthWithType(date, dateType) {
        switch (dateType) {
            case DateType.SHORT:
                return NormalizeDate.NUM_TO_SHORT_MONTH[date.getMonth()];
            case DateType.LONG:
                return NormalizeDate.NUM_TO_LONG_MONTH[date.getMonth()];
            case DateType.COMPACT:
                return (date.getMonth() + 1).toString();
            default:
                return undefined;
        }
    }
    static getDayWithType(date, dateType) {
        switch (dateType) {
            case DateType.SHORT:
                return NormalizeDate.NUM_TO_SHORT_DAY[date.getDay()];
            case DateType.LONG:
                return NormalizeDate.NUM_TO_LONG_DAY[date.getDay()];
            case DateType.COMPACT:
                return date.getDate().toString();
            default:
                return undefined;
        }
    }
    static convertDateToString(date, dateType) {
        if (!date) {
            return undefined;
        }
        let year = date.getFullYear().toString();
        let month = this.getMonthWithType(date, dateType);
        let day = this.getDayWithType(date, dateType);
        switch (dateType) {
            case DateType.SHORT:
            case DateType.LONG:
                return (`${day}, ` +
                    `${month} ${date.getDate()}, ` +
                    `${year}`);
            case DateType.COMPACT:
                return (`${month}/` +
                    `${day}/` +
                    `${year}`);
            default:
                return undefined;
        }
    }
    static convertTimeToString(date, dateType) {
        if (dateType !== DateType.TIME || !date) {
            return undefined;
        }
        let hour = date.getHours();
        let minute = date.getMinutes();
        return TimeUtils.convertTime(hour + ':' + minute);
    }
    static parseDateAndTime(text, reg, func, dateType) {
        let regData;
        while ((regData = reg.exec(text)) !== null) {
            let pre = text.slice(0, regData.index);
            var year = +regData[1];
            var month = +regData[2];
            var day = +regData[3];
            var hour = +regData[4];
            var minute = +regData[5];
            var second = +regData[6];
            var tz = regData[8];
            var flag = regData[9] === '-' ? -1 : 1;
            var tzHour = +regData[10];
            var tzMin = +regData[11];
            var tzOffset = (tz === 'Z' ? 0 : (tzHour * 60 + tzMin) * flag);
            let dateTime;
            if (!TimeUtils.isValidDate(year, month, day)) {
                dateTime = 'Invalid Date';
            }
            else if (!TimeUtils.isValidTime(hour, minute, second)) {
                dateTime = 'Invalid Time';
            }
            else {
                let date = new Date(Date.UTC(year, month - 1, day, hour, minute - tzOffset, second));
                dateTime = func(date, dateType);
            }
            let tail = text.slice(regData.index + regData[0].length, text.length);
            text = pre + dateTime + tail;
        }
        return text;
    }
    static parseCompactDate(text) {
        return this.parseDateAndTime(text, COMPACT_DATE, this.convertDateToString.bind(this), DateType.COMPACT);
    }
    static parseShortDate(text) {
        return this.parseDateAndTime(text, SHORT_DATE, this.convertDateToString.bind(this), DateType.SHORT);
    }
    static parseLongDate(text) {
        return this.parseDateAndTime(text, LONG_DATE, this.convertDateToString.bind(this), DateType.LONG);
    }
    static parseDate(text) {
        return this.parseCompactDate(this.parseLongDate(this.parseShortDate(text)));
    }
    static parseTime(text) {
        return this.parseDateAndTime(text, TIME_WITH_ZONE, this.convertTimeToString.bind(this), DateType.TIME);
    }
    static parseRFC3339(text) {
        return this.parseDate(this.parseTime(text));
    }
}
