import * as React from 'react';
import { LinkData, TextData, Types } from './Mddata';

import { merge } from 'lodash';
import { Rules } from './Rulers';
import { Styles } from './Styles';

import {
    Linking,
    StyleProp,
    Text,
    TextProps,
    TextStyle,
    View,
} from 'react-native';

var mergedStyles: any;

interface IProps extends TextProps {
    markdownStyles?: StyleProp<TextStyle>;
}

export class Markdown extends React.Component<IProps> {

    public render() {     
        // merge Styles with customization markdown style
        mergedStyles = merge({}, Styles, this.props.markdownStyles);
    
        let nodes = [];
        const child = Array.isArray(this.props.children) 
                    ? this.props.children.join('') 
                    : this.props.children;
        if (typeof child === 'string') {
            nodes = Rules.parse(child);  
        }
        
        let content = this.renderNode(nodes, 'markdown');
        return (
            <View>
                {content}
            </View>
        );
    }

    private renderList(data: [], key: string, order: boolean): JSX.Element {
        if (!Array.isArray(data)) {
        return (
                <Text>{'List should be array!'}</Text>
            );
        }

        let listItems = data.map((node, index) => {
            const childKey = key + index.toString();
            return this.renderListItem(node, childKey, index, order);
        });

        return (
            <View style={Styles.list} key={key} >
                {listItems}
            </View>
        );
    }

    private renderListItem(node: any, key: string, index: number, ordered: boolean): JSX.Element {
        return (
            <View style={mergedStyles.listItem} key={key + '_listItem'}>
                {this.renderListBullet(ordered, key, index)}
                {this.renderNode(node, key)}
            </View>
        );
    }

    // TODO: bullet support customization 
    private renderListBullet(ordered: boolean, key: string, index: number): JSX.Element {
        if (ordered) {
            return this.renderText(index + 1 + '.', key + '_orderedList', mergedStyles.listItemNumber);
        } else {
            return this.renderText('\u2022 ', key + '_unorderedList', mergedStyles.listItemBullet);
        }
    }

    private renderLink(node: LinkData, key: string, style: StyleProp<TextStyle>): JSX.Element {
        let mergestyle: StyleProp<TextStyle> = merge({}, style, mergedStyles.link);
        return (
            <Text key={key} style={mergestyle} onPress={() => this.openUrl(node.link)} >{this.renderNode(node.data, key, mergestyle)}</Text>
        );
    }

    // render simple text.
    private renderText(node: TextData | string, key: string, markdownStyles: StyleProp<TextStyle>): JSX.Element {
        const { accessible, style, numberOfLines, ellipsizeMode } = this.props; 
        let mergestyle: StyleProp<TextStyle> = merge({}, style, markdownStyles);
        return (
            <Text
                key={key}
                accessible={accessible}
                style={mergestyle}
                numberOfLines={numberOfLines}
                ellipsizeMode={ellipsizeMode}
            >
                {typeof node === 'string' ? node : this.renderNode(node, key, mergestyle)}
            </Text>
        );
    }

    private renderNode(node: any, key: string, style?: StyleProp<TextStyle>): any {
        if (node === undefined) {
            return undefined;
        }

        if (Array.isArray(node)) {
            return node.map((item, index) => {
                let childKey: string = key + index.toString();
                return this.renderNode(item, childKey, style);
            });
        } else {
            // merge style that from upper node to current node.
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
                    return this.renderLink((node as LinkData), key + '_link', style);
                case Types.orderlist: 
                    return this.renderList(node.data, key + '_orderlist', true);
                case Types.unorderlist: 
                    return this.renderList(node.data, key + '_unorderlist', false);
                case undefined/* string */: 
                    if (typeof node === 'string') {
                        return this.renderText(node, key + '_string', style);
                    } else {
                        return this.renderText('this should be string', key + '_string', style);
                    }
                default: 
                    return this.renderText(node.type + 'is not supported!', key + '_string', style);
            }
        }
    }

    private openUrl = (url: string) => {
        Linking.openURL(url).catch(error =>
            console.warn('An error occurred: ', error),
        );
    }
}
