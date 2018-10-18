import * as React from 'react';
import { Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
export class Toggle extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            if (this.props.onSwitch) {
                this.props.onSwitch(this.props.value);
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
                        marginTop: this.props.marginTop,
                    }
                ] },
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleConfig.getFontSize('default'),
                        fontWeight: StyleConfig.getFontWeight('default'),
                        textAlign: StyleConfig.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleConfig.getWrap(true),
                        paddingRight: 16,
                    } }, this.props.title),
                React.createElement(Switch, { onTintColor: this.switchOnColor, tintColor: this.switchOffColor, value: this.props.activated, onValueChange: this.onClick }))));
    }
    get color() {
        return StyleConfig.getCheckboxTitleColor(this.props.theme);
    }
    get switchOffColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, false);
    }
    get switchOnColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, true);
    }
}
