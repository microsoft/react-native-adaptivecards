export var MarkdownTypes;
(function (MarkdownTypes) {
    MarkdownTypes["Simple"] = "Simple";
    MarkdownTypes["Bold"] = "Bold";
    MarkdownTypes["Italic"] = "Italic";
    MarkdownTypes["Delete"] = "Delete";
    MarkdownTypes["BoldItalic"] = "BoldItalic";
    MarkdownTypes["OrderList"] = "OrderList";
    MarkdownTypes["UnorderList"] = "UnorderList";
    MarkdownTypes["ItemContent"] = "ItemContent";
    MarkdownTypes["HyperLink"] = "HyperLink";
    MarkdownTypes["ImageLink"] = "ImageLink";
    MarkdownTypes["Heading"] = "Heading";
})(MarkdownTypes || (MarkdownTypes = {}));
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
export const Markdown_Formatter_Config = [
    {
        type: MarkdownTypes.OrderList,
        pattern: /^((\s*(\d(\.|\))) [^\n]+))+/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.UnorderList,
        pattern: /^((\s*((\*|\-)) [^\n]+))+/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.Heading,
        pattern: /^(\#{1,6})([^\#\n]+)$/m,
        isSimpleText: false,
    },
    {
        type: MarkdownTypes.ImageLink,
        pattern: /(?:!\[(.*?)\]\((.*?)\))/,
        isSimpleText: true,
    },
    {
        type: MarkdownTypes.HyperLink,
        pattern: /\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/,
        isSimpleText: true,
    },
    {
        type: MarkdownTypes.BoldItalic,
        pattern: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/,
        isSimpleText: true,
    },
];
