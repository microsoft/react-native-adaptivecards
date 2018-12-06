import * as React from 'react';
import { Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
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
                        marginTop: this.props.marginTop,
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
                React.createElement(Switch, { trackColor: {
                        true: this.switchOnColor,
                        false: this.switchOffColor,
                    }, value: this.props.checked, onValueChange: this.onClick }))));
    }
    get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }
    get switchOffColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, false);
    }
    get switchOnColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, true);
    }
}
