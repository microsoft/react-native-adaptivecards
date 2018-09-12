import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleManager } from '../../Styles/StyleManager';
export class Toggle extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            if (this.props.onClick) {
                this.props.onClick(this.props.value);
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
                        paddingTop: 18,
                    }
                ] },
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        textAlign: StyleManager.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleManager.getWrap(true),
                        paddingRight: 16,
                    } }, this.props.title),
                React.createElement(Icon, { name: this.radioIcon, size: 24, color: this.radioColor, style: {
                        paddingTop: 4,
                    } }))));
    }
    get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }
    get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.checked);
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
