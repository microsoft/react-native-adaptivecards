import React from 'react';
import { TextInput, } from 'react-native';
export default class InputTextView extends React.PureComponent {
    render() {
        const { inputText } = this.props;
        if (!inputText || !inputText.isValid()) {
            return null;
        }
        return React.createElement(TextInput, { style: { height: 40, borderColor: 'gray', borderWidth: 1 }, multiline: inputText.isMultiline, blurOnSubmit: true, placeholder: inputText.placeholder, value: inputText.value, returnKeyType: 'done', underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants' });
    }
}
