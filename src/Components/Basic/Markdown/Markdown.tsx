import * as React from 'react';
import { ImageData, LinkData, MarkdownTypes, TextData } from './MarkdownTypes';

import { FitImage } from './FitImage';

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
import { StyleManager } from '../../../Styles/StyleManager';

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
            let rules: Rules = new Rules(child, mergedStyles);
            nodes = rules.parse();  
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
            return this.renderListItem((node as TextData), childKey, index, order);
        });

        return (
            <View style={Styles.list} key={key} >
                {listItems}
            </View>
        );
    }

    private renderListItem(node: TextData, key: string, index: number, ordered: boolean): JSX.Element {
        return (
            <View style={node.style} key={key + '_listItem'}>
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
        let mergestyle: StyleProp<TextStyle> = merge({}, style, node.style);
        return (
            <Text key={key} style={mergestyle} onPress={() => this.openUrl(node.link)} >{this.renderNode(node.data, key, mergestyle)}</Text>
        );
    }

    // render simple text.
    private renderText(node: TextData | string, key: string, styles: StyleProp<TextStyle>): JSX.Element {
        const { accessible, style, numberOfLines, ellipsizeMode } = this.props; 
        let mergestyle: StyleProp<TextStyle> = merge({}, style, styles);
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

    private renderImage(node: ImageData, key: string): JSX.Element {
        return (
            <FitImage key={key} source={node.link} label={node.label} maxHeight={StyleManager.inSetImageMaxHeight} />
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
                case MarkdownTypes.Simple: 
                case MarkdownTypes.Bold: 
                case MarkdownTypes.Italic: 
                case MarkdownTypes.BoldItalic:
                case MarkdownTypes.Delete:  
                case MarkdownTypes.ItemContent: 
                case MarkdownTypes.Heading:
                    return this.renderText(node.data, key + node.type, style ? merge({}, style, node.style) : node.style);
                case MarkdownTypes.HyperLink: 
                    return this.renderLink((node as LinkData), key + node.type, style ? merge({}, style, node.style) : node.style);
                case MarkdownTypes.OrderList: 
                    return this.renderList(node.data, key + node.type, true);
                case MarkdownTypes.UnorderList: 
                    return this.renderList(node.data, key + node.type, false);
                case MarkdownTypes.ImageLink: 
                    return this.renderImage((node as ImageData), key + node.type);
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
        if (!url) {
            console.error('this is an empty url');
        } else {
            Linking.canOpenURL(url).then(supported => { 
                if (!supported) {
                    console.error('url not supported ' + url);
                } else {
                    Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
    }
}
