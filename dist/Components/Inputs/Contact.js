import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageBlock } from '../Basic/ImageBlock';
import { Touchable } from '../Basic/Touchable';
export class Contact extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            if (this.props.onSelect) {
                this.props.onSelect(this.props.hiddenFields);
            }
        };
    }
    render() {
        if (this.props.onSelect) {
            return this.renderTouchableBlock();
        }
        else {
            return this.renderNonTouchableBlock();
        }
    }
    renderTouchableBlock() {
        return (React.createElement(Touchable, { onPress: this.onPress, style: {
                alignSelf: 'stretch',
                flexDirection: 'row'
            } }, this.renderContent()));
    }
    renderNonTouchableBlock() {
        return (React.createElement(View, { alignSelf: 'stretch', flexDirection: 'row' }, this.renderContent()));
    }
    renderContent() {
        return [
            React.createElement(ImageBlock, { url: this.props.avatar, mode: 'avatar', width: StyleManager.getImageSize('medium'), height: StyleManager.getImageSize('medium') }),
            React.createElement(View, null,
                React.createElement(Text, { accessible: true, style: {
                        color: StyleManager.getColor('default', this.props.theme, false),
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: 'transparent',
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(true),
                    } }, this.props.mainInfo),
                React.createElement(Text, { accessible: true, style: {
                        color: StyleManager.getColor('default', this.props.theme, true),
                        fontSize: StyleManager.getFontSize('small'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: 'transparent',
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(true),
                    } }, this.props.subInfo))
        ];
    }
}
