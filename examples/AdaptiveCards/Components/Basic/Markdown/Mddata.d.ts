export declare enum Types {
    simple = 0,
    bold = 1,
    italic = 2,
    orderlist = 3,
    unorderlist = 4,
    itemcontent = 5,
    hyperlinks = 6
}
export interface RegData {
    data: RegExpExecArray;
    type: Types;
}
export interface TextData {
    type: Types;
    data: any;
}
export interface LinkData extends TextData {
    link: string;
}
export declare var NUM_TO_LongDay: string[];
export declare var NUM_TO_ShortDay: string[];
export declare var NUM_TO_LongMonth: string[];
export declare var NUM_TO_ShortMonth: string[];
