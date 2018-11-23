import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleManager } from '../../Styles/StyleManager';
export class RadioBox extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            if (this.props.onCheck) {
                this.props.onCheck(this.props.index);
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
                React.createElement(Icon, { name: this.radioIcon, size: 24, color: this.radioColor, style: {
                        paddingTop: 4,
                    } }),
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleManager.getFontSize('default', this.props.config),
                        fontWeight: StyleManager.getFontWeight('default', this.props.config),
                        textAlign: StyleManager.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleManager.getWrap(true),
                        paddingLeft: 16,
                    } }, this.props.title))));
    }
    get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme, this.props.config);
    }
    get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.selected, this.props.config);
    }
    get radioIcon() {
        if (this.props.selected) {
            return 'radio-button-checked';
        }
        else {
            return 'radio-button-unchecked';
        }
    }
}
