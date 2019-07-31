import { StyleProp, TextStyle } from 'react-native';
export declare enum MarkdownTypes {
    Simple = "Simple",
    Bold = "Bold",
    Italic = "Italic",
    Delete = "Delete",
    BoldItalic = "BoldItalic",
    OrderList = "OrderList",
    UnorderList = "UnorderList",
    ItemContent = "ItemContent",
    HyperLink = "HyperLink",
    ImageLink = "ImageLink",
    Heading = "Heading"
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
export declare const NormalizeDate: {
    NUM_TO_LONG_DAY: string[];
    NUM_TO_SHORT_DAY: string[];
    NUM_TO_LONG_MONTH: string[];
    NUM_TO_SHORT_MONTH: string[];
};
export interface MarkdownFormatter {
    type: MarkdownTypes;
    pattern: any;
    isSimpleText: boolean;
}
export declare const Markdown_Formatter_Config: MarkdownFormatter[];
