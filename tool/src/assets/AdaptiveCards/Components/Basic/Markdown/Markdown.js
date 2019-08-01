import * as React from 'react';
import { MarkdownTypes } from './MarkdownTypes';
import { FitImage } from './FitImage';
import { merge } from 'lodash';
import { Rules } from './Rulers';
import { Styles } from './Styles';
import { Linking, Text, View, } from 'react-native';
import { StyleManager } from '../../../Styles/StyleManager';
var mergedStyles;
export class Markdown extends React.Component {
    constructor() {
        super(...arguments);
        this.openUrl = (url) => {
            if (!url) {
                console.error('this is an empty url');
            }
            else {
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.error('url not supported ' + url);
                    }
                    else {
                        Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
            }
        };
    }
    render() {
        mergedStyles = merge({}, Styles, this.props.markdownStyles);
        let nodes = [];
        const child = Array.isArray(this.props.children)
            ? this.props.children.join('')
            : this.props.children;
        if (typeof child === 'string') {
            let rules = new Rules(child, mergedStyles);
            nodes = rules.parse();
        }
        let content = this.renderNode(nodes, 'markdown');
        return (React.createElement(View, null, content));
    }
    renderList(data, key, order) {
        if (!Array.isArray(data)) {
            return (React.createElement(Text, null, 'List should be array!'));
        }
        let listItems = data.map((node, index) => {
            const childKey = key + index.toString();
            return this.renderListItem(node, childKey, index, order);
        });
        return (React.createElement(View, { style: Styles.list, key: key }, listItems));
    }
    renderListItem(node, key, index, ordered) {
        return (React.createElement(View, { style: node.style, key: key + '_listItem' },
            this.renderListBullet(ordered, key, index),
            this.renderNode(node, key)));
    }
    renderListBullet(ordered, key, index) {
        if (ordered) {
            return this.renderText(index + 1 + '.', key + '_orderedList', mergedStyles.listItemNumber);
        }
        else {
            return this.renderText('\u2022 ', key + '_unorderedList', mergedStyles.listItemBullet);
        }
    }
    renderLink(node, key, style) {
        let mergestyle = merge({}, style, node.style);
        return (React.createElement(Text, { key: key, style: mergestyle, onPress: () => this.openUrl(node.link) }, this.renderNode(node.data, key, mergestyle)));
    }
    renderText(node, key, styles) {
        const { accessible, style, numberOfLines, ellipsizeMode } = this.props;
        let mergestyle = merge({}, style, styles);
        return (React.createElement(Text, { key: key, accessible: accessible, style: mergestyle, numberOfLines: numberOfLines, ellipsizeMode: ellipsizeMode }, typeof node === 'string' ? node : this.renderNode(node, key, mergestyle)));
    }
    renderImage(node, key) {
        return (React.createElement(FitImage, { key: key, source: node.link, label: node.label, maxHeight: StyleManager.inSetImageMaxHeight }));
    }
    renderNode(node, key, style) {
        if (node === undefined) {
            return undefined;
        }
        if (Array.isArray(node)) {
            return node.map((item, index) => {
                let childKey = key + index.toString();
                return this.renderNode(item, childKey, style);
            });
        }
        else {
            switch (node.type) {
                case MarkdownTypes.Simple:
                case MarkdownTypes.Bold:
                case MarkdownTypes.Italic:
                case MarkdownTypes.BoldItalic:
                case MarkdownTypes.Delete:
                case MarkdownTypes.ItemContent:
                case MarkdownTypes.Heading:
                    return this.renderText(node.data, key + node.type, style ? merge({}, style, node.style) : node.style);
                case MarkdownTypes.HyperLink:
                    return this.renderLink(node, key + node.type, style ? merge({}, style, node.style) : node.style);
                case MarkdownTypes.OrderList:
                    return this.renderList(node.data, key + node.type, true);
                case MarkdownTypes.UnorderList:
                    return this.renderList(node.data, key + node.type, false);
                case MarkdownTypes.ImageLink:
                    return this.renderImage(node, key + node.type);
                case undefined:
                    if (typeof node === 'string') {
                        return this.renderText(node, key + '_string', style);
                    }
                    else {
                        return this.renderText('this should be string', key + '_string', style);
                    }
                default:
                    return this.renderText(node.type + 'is not supported!', key + '_string', style);
            }
        }
    }
}
