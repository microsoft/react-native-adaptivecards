export declare class TimeUtils {
    static getFileTime(): number;
    static isDate(value: string): boolean;
    static isTime(value: string): boolean;
    static extractDate(value: string): Date;
    static isValidDate(year: number, month: number, day: number): boolean;
    static isValidTime(hour: number, minute: number, second: number): boolean;
    static convertTime(time: string): string;
    static extractTime(value: string): Date;
    static getDateString(date: Date): string;
    static getTimeString(date: Date): string;
    static composeTimeString(hour: number, minute: number): string;
}
