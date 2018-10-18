import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { Touchable } from '../Basic/Touchable';
export class Choice extends React.Component {
    constructor() {
        super(...arguments);
        this.onChoose = () => {
            if (this.props.onSelect) {
                this.props.onSelect(this.props.index);
            }
        };
    }
    render() {
        return (React.createElement(Touchable, { onPress: this.onChoose, style: {
                paddingTop: StyleManager.getSeparatorSpacing(this.props.config),
                paddingBottom: StyleManager.getSeparatorSpacing(this.props.config),
            } },
            React.createElement(Text, { style: {
                    color: this.color,
                    fontSize: this.fontSize,
                    lineHeight: this.lineHeight,
                    fontWeight: StyleManager.getFontWeight('default', this.props.config),
                    textAlign: StyleManager.getTextAlign('left'),
                    flexWrap: StyleManager.getWrap(false),
                } }, this.props.title)));
    }
    get lineHeight() {
        return this.fontSize * 1.2;
    }
    get fontSize() {
        return StyleManager.getFontSize('default', this.props.config);
    }
    get color() {
        if (this.props.selected) {
            return StyleManager.getColor('accent', 'default', false, this.props.config);
        }
        else {
            return StyleManager.getColor('default', 'default', false, this.props.config);
        }
    }
}
