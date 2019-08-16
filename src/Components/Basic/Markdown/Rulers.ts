import { 
    ImageData, LinkData, Markdown_Formatter_Config, MarkdownFormatter, MarkdownTypes, TextData
} from './MarkdownTypes';
import { RFC3339Date } from './RFC3339Date';

const CR_NEWLINE_R = /\r\n?/g;
const TAB_R = /\t/g;
const FORMFEED_R = /\f/g;
const SPECIAL_CHAR_REGEX = /[\\]/g;
const LIST_ITME = /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/;

export class Rules {
    public text: string;
    public styles: any;

    constructor(text: string, styles?: any) {
        this.text = text;
        this.styles = styles;
    }

    public parse() : any {
        if (typeof this.text !== 'string') {
            return undefined;
        }

        let out: any = this.text;
        out = this.preprocessor(out);        
        out = RFC3339Date.parseRFC3339(out).toString();
        
        for (var i = 0; i < Markdown_Formatter_Config.length; ++i) {
            out = this.execData(out, Markdown_Formatter_Config[i], false);    
        }

        return out;
    }

    // Turn various crazy whitespace into easy to process things
    private preprocessor(text: string): string {
        return text.replace(CR_NEWLINE_R, '\n')
                .replace(FORMFEED_R, '')
                .replace(TAB_R, '    ')
                .replace(SPECIAL_CHAR_REGEX, '');
    }

    private execData(data: any, markdownFormatter: MarkdownFormatter, isAlreadySimpleText?: boolean): any {
        if (typeof data === 'string') {
            if (markdownFormatter.isSimpleText && !isAlreadySimpleText) {
                return this.parseSimpleText(data, markdownFormatter);
            } else {
                return this.parseText(data, markdownFormatter);
            }
        } else if (Array.isArray(data)) {
            return data.map(e => this.execData(e, markdownFormatter, isAlreadySimpleText));
        } else if (typeof data === 'object') {
            data.data = this.execData(data.data, markdownFormatter, data.type === MarkdownTypes.Simple ? true : isAlreadySimpleText);
            return data;
        } else {
            return null;
        }
    }

    // regard text as a group, so it will render continue in current line
    private parseSimpleText(text: string, markdownFormatter: MarkdownFormatter) {
        let out = [];
        if (text.length) {
            out.push({
                type: MarkdownTypes.Simple,
                data: this.parseText(text, markdownFormatter),
            });
        }

        return out;
    }

    private parseText(text: string, markdownFormatter: MarkdownFormatter) {
        if (markdownFormatter.pattern.exec(text) === null) {
            return text;
        }

        let out = [];
        let regData: RegExpExecArray;
        while ((regData = markdownFormatter.pattern.exec(text)) !== null) {
            if (regData.index > 0) {
                out.push(text.slice(0, regData.index));
            }

            switch (markdownFormatter.type) {
                case MarkdownTypes.Heading:
                    let headingData: TextData = {
                        type: MarkdownTypes.Heading,
                        data: regData[2],
                        style: this.styles[`h${regData[1].length}`],
                    };
                    out.push(headingData);  
                    break;
                case MarkdownTypes.ImageLink:
                    let imageLinkData: ImageData = {
                        type: MarkdownTypes.ImageLink,
                        link: regData[2],
                        label: regData[1],
                        data: '',
                    };
        
                    out.push(imageLinkData);
                    break;
                case MarkdownTypes.HyperLink:
                    let linkData: LinkData = {
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
                    let listItem: RegExpExecArray | null;
                    let items = [];
                    // list may include order and unorder item, and separate them.
                    for (let i = 0; i < helper.length; i++) {
                        if ((listItem = LIST_ITME.exec(helper[i])) !== null) {
                            let item: TextData = {
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
                    let textData: TextData = {
                        type: MarkdownTypes.BoldItalic,
                        data: this.parseText(regData[2], markdownFormatter),
                        style: this.styles.bolditalic,
                    };
                    if (regData[1] === '~~') {
                        textData.type = MarkdownTypes.Delete;
                        textData.style = this.styles.delete;
                    } else {
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
