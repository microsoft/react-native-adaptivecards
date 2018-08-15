import * as React from 'react';
import { TextInput, } from 'react-native';
export class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(TextInput, { style: [
                {
                    flex: this.props.flex,
                    color: this.props.color,
                    fontFamily: this.props.fontFamily,
                    fontSize: this.props.fontSize,
                    fontWeight: this.props.fontWeight,
                    backgroundColor: this.props.backgroundColor,
                    width: this.props.width,
                    height: this.props.height,
                    borderColor: this.props.borderColor,
                    borderWidth: this.props.borderWidth,
                    borderRadius: this.props.borderRadius,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft,
                },
                this.props.style
            ], multiline: this.props.multiline, keyboardType: this.props.keyboardType, blurOnSubmit: true, placeholder: this.props.placeholder, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.props.onValueChange, onFocus: this.props.onFocus, onBlur: this.props.onBlur }));
    }
}
