import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
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
        return (React.createElement(Touchable, { onPress: this.onChoose },
            React.createElement(Text, { style: {
                    color: this.color,
                    fontSize: StyleManager.getFontSize('default'),
                    fontWeight: StyleManager.getFontWeight('default'),
                    backgroundColor: this.backgroundColor,
                    textAlign: StyleManager.getTextAlign('left'),
                    flexWrap: StyleManager.getWrap(false),
                } }, this.props.title)));
    }
    get color() {
        if (this.props.selected) {
            return StyleManager.getColor('accent', 'emphasis', true);
        }
        else {
            return StyleManager.getColor('default', 'default', false);
        }
    }
    get backgroundColor() {
        if (this.props.selected) {
            return StyleManager.getBackgroundColor('emphasis');
        }
        else {
            return StyleManager.getBackgroundColor('default');
        }
    }
}
