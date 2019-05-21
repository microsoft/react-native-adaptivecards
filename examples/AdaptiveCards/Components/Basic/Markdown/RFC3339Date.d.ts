export declare class RFC3339Date {
    private static getMonthWithType;
    private static getDayWithType;
    private static convertDateToString;
    private static convertTimeToString;
    private static parseDateAndTime;
    static parseCompactDate(text: string): string;
    static parseShortDate(text: string): string;
    static parseLongDate(text: string): string;
    static parseDate(text: string): string;
    static parseTime(text: string): string;
    static parseRFC3339(text: string): string;
}
