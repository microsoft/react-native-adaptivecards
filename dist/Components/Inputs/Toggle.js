import * as React from 'react';
import { Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class Toggle extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            this.onSwitchValueChange(!this.props.activated);
        };
        this.onSwitchValueChange = (value) => {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        };
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { disabled: true, onPress: this.onClick },
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
                        fontSize: StyleManager.getFontSize('default', this.props.config),
                        fontWeight: StyleManager.getFontWeight('default', this.props.config),
                        textAlign: StyleManager.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleManager.getWrap(true),
                        paddingRight: 16,
                    } }, this.props.title),
                React.createElement(Switch, { trackColor: {
                        true: this.switchOnColor,
                        false: this.switchOffColor,
                    }, value: this.props.activated, onValueChange: this.onSwitchValueChange }))));
    }
    get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme, this.props.config);
    }
    get switchOffColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, false, this.props.config);
    }
    get switchOnColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, true, this.props.config);
    }
}
