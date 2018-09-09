import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class Label extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            if (this.props.onPress) {
                this.props.onPress(this.props.index);
            }
        };
    }
    render() {
        if (this.props.title) {
            return (React.createElement(TouchableWithoutFeedback, { onPress: this.onPress },
                React.createElement(View, { style: {
                        backgroundColor: this.backgroundColor,
                        paddingTop: this.paddingVertical - 6,
                        paddingBottom: this.paddingVertical - 6,
                        borderRadius: 4,
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginTop: 6,
                        marginBottom: 6,
                        marginLeft: 6,
                    } },
                    React.createElement(Text, { style: {
                            fontSize: this.fontSize,
                            fontWeight: this.fontWeight,
                            color: this.color,
                        } }, this.props.title))));
        }
        return undefined;
    }
    get fontSize() {
        return StyleManager.getFontSize('default');
    }
    get fontWeight() {
        return StyleManager.getFontWeight('default');
    }
    get paddingVertical() {
        return 12;
    }
    get color() {
        return StyleManager.getColor('light', this.props.theme, false);
    }
    get backgroundColor() {
        if (this.props.focused) {
            return StyleManager.getColor('accent', this.props.theme, false);
        }
        else {
            return StyleManager.getColor('accent', this.props.theme, true);
        }
    }
}
