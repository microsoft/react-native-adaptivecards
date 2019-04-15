import * as React from 'react';
import { Types } from './Mddata';
import { merge } from 'lodash';
import { Rules } from './Rulers';
import { Styles } from './Styles';
import { Linking, Text, View, } from 'react-native';
var mergedStyles;
export class Markdown extends React.Component {
    constructor() {
        super(...arguments);
        this.openUrl = (url) => {
            Linking.openURL(url).catch(error => console.warn('An error occurred: ', error));
        };
    }
    render() {
        mergedStyles = merge({}, Styles, this.props.markdownStyles);
        let nodes = [];
        const child = Array.isArray(this.props.children)
            ? this.props.children.join('')
            : this.props.children;
        if (typeof child === 'string') {
            nodes = Rules.parse(child);
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
        return (React.createElement(View, { style: mergedStyles.listItem, key: key + '_listItem' },
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
        let mergestyle = merge({}, style, mergedStyles.link);
        return (React.createElement(Text, { key: key, style: mergestyle, onPress: () => this.openUrl(node.link) }, this.renderNode(node.data, key, mergestyle)));
    }
    renderText(node, key, markdownStyles) {
        const { accessible, style, numberOfLines, ellipsizeMode } = this.props;
        let mergestyle = merge({}, style, markdownStyles);
        return (React.createElement(Text, { key: key, accessible: accessible, style: mergestyle, numberOfLines: numberOfLines, ellipsizeMode: ellipsizeMode }, typeof node === 'string' ? node : this.renderNode(node, key, mergestyle)));
    }
    renderNode(node, key, style) {
        if (Array.isArray(node)) {
            return node.map((item, index) => {
                let childKey = key + index.toString();
                return this.renderNode(item, childKey, style);
            });
        }
        else {
            switch (node.type) {
                case Types.simple:
                    return this.renderText(node.data, key + '_simple', style);
                case Types.bold:
                    return this.renderText(node.data, key + '_bold', style ? merge({}, style, mergedStyles.bold) : mergedStyles.bold);
                case Types.italic:
                    return this.renderText(node.data, key + '_italic', style ? merge({}, style, mergedStyles.italic) : mergedStyles.italic);
                case Types.itemcontent:
                    return this.renderText(node.data, key + '_link', style);
                case Types.hyperlinks:
                    return this.renderLink(node, key + '_link', style);
                case Types.orderlist:
                    return this.renderList(node.data, key + '_orderlist', true);
                case Types.unorderlist:
                    return this.renderList(node.data, key + '_unorderlist', false);
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
