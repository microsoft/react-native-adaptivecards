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

export var NUM_TO_LongDay = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
  
export var NUM_TO_ShortDay = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
  
export var NUM_TO_LongMonth = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
  
export var NUM_TO_ShortMonth = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
