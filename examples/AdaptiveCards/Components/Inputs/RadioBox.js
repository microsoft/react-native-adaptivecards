import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class RadioBox extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCheckedRadio = () => {
            return (React.createElement(View, { style: {
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: this.radioColor,
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                } },
                React.createElement(View, { style: {
                        width: 10,
                        height: 10,
                        backgroundColor: this.radioColor,
                        borderRadius: 5
                    } })));
        };
        this.renderUncheckedRadio = () => {
            return (React.createElement(View, { style: {
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: this.radioColor,
                    borderRadius: 9
                } }));
        };
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
                this.props.checked ? this.renderCheckedRadio() : this.renderUncheckedRadio(),
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
