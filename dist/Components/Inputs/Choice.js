import * as React from 'react';
import { Text } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
import { Touchable } from '../Basic/Touchable';
export class Choice extends React.Component {
    constructor() {
        super(...arguments);
        this.onChoose = () => {
            if (this.props.onChoose) {
                this.props.onChoose(this.props.value);
            }
        };
    }
    render() {
        return (React.createElement(Touchable, { onPress: this.onChoose, style: {
                paddingTop: StyleConfig.separatorSpacing,
                paddingBottom: StyleConfig.separatorSpacing,
            } },
            React.createElement(Text, { style: {
                    color: this.color,
                    fontSize: StyleConfig.getFontSize('default'),
                    lineHeight: this.lineHeight,
                    fontWeight: StyleConfig.getFontWeight('default'),
                    backgroundColor: this.backgroundColor,
                    textAlign: StyleConfig.getTextAlign('left'),
                    flexWrap: StyleConfig.getWrap(false),
                } }, this.props.title)));
    }
    get lineHeight() {
        return this.fontSize * 1.2;
    }
    get fontSize() {
        return StyleConfig.getFontSize('default');
    }
    get color() {
        return StyleConfig.getColor('default', 'default', false);
    }
    get backgroundColor() {
        if (this.props.selected) {
            return StyleConfig.getColor('accent', 'default', false);
        }
        else {
            return StyleConfig.getBackgroundColor('default');
        }
    }
}
