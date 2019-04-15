export enum Types {
    simple,
    bold,
    italic,
    orderlist,
    unorderlist,
    itemcontent,
    hyperlinks,
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
