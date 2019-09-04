import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Radio } from 'react-native-common-ui';
import { StyleManager } from '../../Styles/StyleManager';
export class RadioBox extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            console.log('RadioBox clicked');
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
                React.createElement(Radio, { checked: this.props.checked, width: 24, height: 24, color: this.radioColor, style: {
                        marginRight: 4
                    } }),
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        textAlign: StyleManager.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleManager.getWrap(true),
                        paddingLeft: 16,
                    } }, this.props.title))));
    }
    get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }
    get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.checked);
    }
}
