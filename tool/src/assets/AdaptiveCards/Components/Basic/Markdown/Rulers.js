import { Markdown_Formatter_Config, MarkdownTypes } from './MarkdownTypes';
import { RFC3339Date } from './RFC3339Date';
const CR_NEWLINE_R = /\r\n?/g;
const TAB_R = /\t/g;
const FORMFEED_R = /\f/g;
const SPECIAL_CHAR_REGEX = /[\\]/g;
const LIST_ITME = /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/;
export class Rules {
    constructor(text, styles) {
        this.text = text;
        this.styles = styles;
    }
    parse() {
        if (typeof this.text !== 'string') {
            return undefined;
        }
        let out = this.text;
        out = this.preprocessor(out);
        out = RFC3339Date.parseRFC3339(out).toString();
        for (var i = 0; i < Markdown_Formatter_Config.length; ++i) {
            out = this.execData(out, Markdown_Formatter_Config[i], false);
        }
        return out;
    }
    preprocessor(text) {
        return text.replace(CR_NEWLINE_R, '\n')
            .replace(FORMFEED_R, '')
            .replace(TAB_R, '    ')
            .replace(SPECIAL_CHAR_REGEX, '');
    }
    execData(data, markdownFormatter, isAlreadySimpleText) {
        if (typeof data === 'string') {
            if (markdownFormatter.isSimpleText && !isAlreadySimpleText) {
                return this.parseSimpleText(data, markdownFormatter);
            }
            else {
                return this.parseText(data, markdownFormatter);
            }
        }
        else if (Array.isArray(data)) {
            return data.map(e => this.execData(e, markdownFormatter, isAlreadySimpleText));
        }
        else if (typeof data === 'object') {
            data.data = this.execData(data.data, markdownFormatter, data.type === MarkdownTypes.Simple ? true : isAlreadySimpleText);
            return data;
        }
        else {
            return null;
        }
    }
    parseSimpleText(text, markdownFormatter) {
        let out = [];
        if (text.length) {
            out.push({
                type: MarkdownTypes.Simple,
                data: this.parseText(text, markdownFormatter),
            });
        }
        return out;
    }
    parseText(text, markdownFormatter) {
        if (markdownFormatter.pattern.exec(text) === null) {
            return text;
        }
        let out = [];
        let regData;
        while ((regData = markdownFormatter.pattern.exec(text)) !== null) {
            if (regData.index > 0) {
                out.push(text.slice(0, regData.index));
            }
            switch (markdownFormatter.type) {
                case MarkdownTypes.Heading:
                    let headingData = {
                        type: MarkdownTypes.Heading,
                        data: regData[2],
                        style: this.styles[`h${regData[1].length}`],
                    };
                    out.push(headingData);
                    break;
                case MarkdownTypes.ImageLink:
                    let imageLinkData = {
                        type: MarkdownTypes.ImageLink,
                        link: regData[2],
                        label: regData[1],
                        data: '',
                    };
                    out.push(imageLinkData);
                    break;
                case MarkdownTypes.HyperLink:
                    let linkData = {
                        type: MarkdownTypes.HyperLink,
                        link: regData[2],
                        data: regData[1],
                        style: this.styles.link,
                    };
                    out.push(linkData);
                    break;
                case MarkdownTypes.OrderList:
                case MarkdownTypes.UnorderList:
                    let helper = regData[0].split('\n');
                    let listItem;
                    let items = [];
                    for (let i = 0; i < helper.length; i++) {
                        if ((listItem = LIST_ITME.exec(helper[i])) !== null) {
                            let item = {
                                type: MarkdownTypes.ItemContent,
                                data: listItem[6].trim(),
                                style: this.styles.listItem
                            };
                            items.push(item);
                        }
                    }
                    if (items.length) {
                        out.push({
                            type: markdownFormatter.type,
                            data: items,
                        });
                    }
                    break;
                case MarkdownTypes.BoldItalic:
                    let textData = {
                        type: MarkdownTypes.BoldItalic,
                        data: this.parseText(regData[2], markdownFormatter),
                        style: this.styles.bolditalic,
                    };
                    if (regData[1] === '~~') {
                        textData.type = MarkdownTypes.Delete;
                        textData.style = this.styles.delete;
                    }
                    else {
                        switch (regData[1].length) {
                            case 1:
                                textData.type = MarkdownTypes.Italic;
                                textData.style = this.styles.italic;
                                break;
                            case 2:
                                textData.type = MarkdownTypes.Bold;
                                textData.style = this.styles.bold;
                                break;
                            case 3:
                            default:
                                break;
                        }
                    }
                    out.push(textData);
                    break;
                default:
                    break;
            }
            text = text.slice(regData.index + regData[0].length);
            if (!markdownFormatter.isSimpleText) {
                text = text.trim();
            }
        }
        if (text.length) {
            out.push(text);
        }
        return out;
    }
}
