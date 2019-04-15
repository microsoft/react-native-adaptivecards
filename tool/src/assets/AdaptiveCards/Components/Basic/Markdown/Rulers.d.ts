import { RegData, Types } from './Mddata';
export declare const Rules: {
    regexobject: {
        bold: RegExp;
        italic: RegExp;
        lists: RegExp;
        listItem: RegExp;
        links: RegExp;
    };
    parse(text: string): any;
    execType(data: any, func: any): any;
    parseList(text: string): ({
        type: Types;
        data: string;
    } | {
        type: Types;
        data: {
            type: Types;
            data: string;
        }[];
    })[];
    parseLink(text: string): any;
    parseText(text: string): any;
    findNextType(text: string): RegData;
    findBold(text: string): RegData;
    findItalic(text: string): RegData;
    find(reg: RegExp, type: Types, text: string): RegData;
};
