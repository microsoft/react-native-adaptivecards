import { Types } from './Mddata';
var CR_NEWLINE_R = /\r\n?/g;
var TAB_R = /\t/g;
var FORMFEED_R = /\f/g;
export const Rules = {
    regexobject: {
        bold: /\*\*([^\n*]+)\*\*/,
        italic: /_([^\n_]+)_/,
        lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+/gm,
        listItem: /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/,
        links: /\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/
    },
    parse(text) {
        if (typeof text !== 'string') {
            return undefined;
        }
        text = text.replace(CR_NEWLINE_R, '\n')
            .replace(FORMFEED_R, '')
            .replace(TAB_R, '    ');
        let out = this.execType(text, this.parseList.bind(this));
        out = this.execType(out, this.parseLink.bind(this));
        out = this.execType(out, this.parseText.bind(this));
        return out;
    },
    execType(data, func) {
        if (typeof data === 'string') {
            return func(data);
        }
        else if (Array.isArray(data)) {
            return data.map(e => this.execType(e, func));
        }
        else if (typeof data === 'object') {
            data.data = this.execType(data.data, func);
            return data;
        }
    },
    parseList(text) {
        let out = [];
        let stra;
        while ((stra = this.regexobject.lists.exec(text)) !== null) {
            let before = text.slice(0, stra.index).trim();
            if (before.length) {
                out.push({
                    type: Types.simple,
                    data: before,
                });
            }
            let helper = stra[0].split('\n');
            let listItem;
            let orderItems = [];
            let unorderItems = [];
            for (let i = 0; i < helper.length; i++) {
                if ((listItem = this.regexobject.listItem.exec(helper[i])) !== null) {
                    if ((listItem[0].trim().substr(0, 1) === '*') || (listItem[0].trim().substr(0, 1) === '-')) {
                        if (orderItems.length) {
                            out.push({
                                type: Types.orderlist,
                                data: orderItems,
                            });
                            orderItems = [];
                        }
                        unorderItems.push({
                            type: Types.itemcontent,
                            data: listItem[6].trim(),
                        });
                    }
                    else {
                        if (unorderItems.length) {
                            out.push({
                                type: Types.unorderlist,
                                data: unorderItems,
                            });
                            unorderItems = [];
                        }
                        orderItems.push({
                            type: Types.itemcontent,
                            data: listItem[6].trim(),
                        });
                    }
                }
            }
            if (orderItems.length) {
                out.push({
                    type: Types.orderlist,
                    data: orderItems,
                });
                orderItems = [];
            }
            if (unorderItems.length) {
                out.push({
                    type: Types.unorderlist,
                    data: unorderItems,
                });
                unorderItems = [];
            }
            text = text.slice(stra.index + stra[0].length, text.length).trim();
        }
        if (text.length) {
            out.push({
                type: Types.simple,
                data: text.trim(),
            });
        }
        return out;
    },
    parseLink(text) {
        if (this.regexobject.links.exec(text) === null) {
            return text;
        }
        const out = [];
        let regData;
        while ((regData = this.regexobject.links.exec(text)) !== null) {
            if (!regData || regData.length < 3) {
                break;
            }
            if (regData.index > 0) {
                out.push(text.slice(0, regData.index));
            }
            out.push({
                type: Types.hyperlinks,
                link: regData[2],
                data: regData[1],
            });
            text = text.slice(regData.index + regData[0].length);
        }
        if (text.length) {
            out.push(text);
        }
        return out;
    },
    parseText(text) {
        if (this.findNextType(text) === null) {
            return text;
        }
        const out = [];
        let regData;
        while ((regData = this.findNextType(text)) !== null) {
            if (regData.data.index > 0) {
                out.push(text.slice(0, regData.data.index));
            }
            out.push({
                type: regData.type,
                data: this.parseText(regData.data[1]),
            });
            text = text.slice(regData.data.index + regData.data[0].length);
        }
        if (text.length) {
            out.push(text);
        }
        return out;
    },
    findNextType(text) {
        let boldData = this.findBold(text);
        let italicData = this.findItalic(text);
        const data = [];
        if (boldData) {
            data.push(boldData);
        }
        if (italicData) {
            data.push(italicData);
        }
        let sortedData = data.sort(function (a, b) {
            return a.data.index - b.data.index;
        });
        return sortedData.length ? sortedData[0] : null;
    },
    findBold(text) {
        return this.find(Rules.regexobject.bold, Types.bold, text);
    },
    findItalic(text) {
        return this.find(this.regexobject.italic, Types.italic, text);
    },
    find(reg, type, text) {
        let regRes = reg.exec(text);
        if (regRes) {
            let ret = {
                type: type,
                data: regRes,
            };
            return ret;
        }
        return null;
    },
};
