import {
    StyleProp,
    TextStyle,
} from 'react-native';

// Currently Type supported: Bold, Italic, Delete, OrderList, UnorderList, HyperLink, ImageLink, Heading
export enum MarkdownTypes {
    Simple = 'Simple',
    Bold = 'Bold',
    Italic = 'Italic',
    Delete = 'Delete',
    BoldItalic = 'BoldItalic',
    OrderList = 'OrderList',
    UnorderList = 'UnorderList',
    ItemContent = 'ItemContent',
    HyperLink = 'HyperLink',
    ImageLink = 'ImageLink',
    Heading = 'Heading',
}

export interface TextData {
    type: MarkdownTypes;
    data: any;
    style?: StyleProp<TextStyle>;
}

export interface LinkData extends TextData {
    link: string;
}

export interface ImageData extends LinkData {
    label?: string;
}

export const NormalizeDate = {
    NUM_TO_LONG_DAY: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],

    NUM_TO_SHORT_DAY: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ],

    NUM_TO_LONG_MONTH: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],

    NUM_TO_SHORT_MONTH: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
};

export interface MarkdownFormatter {
    // the kind of type that the formatter is going to deal
    type: MarkdownTypes;
    // get the target text by the pattern
    pattern: any;
    // sometimes text should not be separated
    // yes: the whole text will render in one text
    // no: text will be separated into array
    isSimpleText: boolean;
}

// TODO: parse [![]()]()
export const Markdown_Formatter_Config: MarkdownFormatter[] = [
    {
        type: MarkdownTypes.OrderList,
        // recognize `1.`, `2.`, `1)`, `2)`... list
        // example: 1. Numbered\r2. List
        pattern: /^((\s*(\d(\.|\))) [^\n]+))+/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.UnorderList,
        // recognize `*` `-`,... list
        // example: - Bullet \r- List
        pattern: /^((\s*((\*|\-)) [^\n]+))+/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.Heading,
        // recognize `#` `##`,..., `######`, and also can get the level of head by length of result
        // example: ### To speak with me again, ask Cortana to Open Alexa.\n ### And then try: \n
        pattern: /^(\#{1,6})([^\#\n]+)$/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.ImageLink,
        // recognize `![]()`, 
        // example: ![](https://m.media-amazon.com/images/G/01/BAIK/stars_four_80x15px._CB1510017351_.png)
        pattern: /(?:!\[(.*?)\]\((.*?)\))/,
        isSimpleText: true,
    },
    {
        type: MarkdownTypes.HyperLink,
        // recognize `[]()`, 
        // example: [Adaptive Cards](http://adaptivecards.io)
        pattern: /\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/,
        isSimpleText: true,
    },
    {
        type: MarkdownTypes.BoldItalic,
        // recognize `*XXX*`, `**XXX**`, `***XXX***`, `_XXX_`, `__XXX__`, `__XXX__`, `~XXX~`, `~~XXX~~`, `~~~XXX~~~`
        // `~~` is regarded as Delete
        // `*` `_` `~` is regarded as Italic
        // `**` `__` is regarded as Bold
        // `***` `___` `~~~` is regarded as BoldItalic
        // example: This is some **bold** text, This is some _italic_ text, This is some ~~delete~~ text"
        pattern: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/,
        isSimpleText: true,
    },
];
