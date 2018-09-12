import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleManager } from '../../Styles/StyleManager';
export class Toggle extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            if (this.props.onClick) {
                this.props.onClick(this.props.index);
            }
        };
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: this.onClick },
            React.createElement(View, { style: [
                    {
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                    }
                ] },
                React.createElement(Icon, { name: this.radioIcon, size: 24, color: this.radioColor }),
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(false),
                        paddingLeft: 12,
                        paddingRight: 12,
                    } }, this.props.title))));
    }
    get color() {
        return StyleManager.getColor('default', this.props.theme, false);
    }
    get radioColor() {
        if (this.props.checked) {
            return StyleManager.getColor('accent', this.props.theme, false);
        }
        else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }
    get radioIcon() {
        if (this.props.checked) {
            return 'toggle-on';
        }
        else {
            return 'toggle-off';
        }
    }
}
