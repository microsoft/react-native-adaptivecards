import React from 'react';
import { TextInput, } from 'react-native';
export default class InputTextView extends React.PureComponent {
    render() {
        const { inputText } = this.props;
        if (!inputText || !inputText.isValid()) {
            return null;
        }
        return React.createElement(
            TextInput,
            {
                style: {
                    height: inputText.isMultiline ? 106 : 38,
                    fontSize: 16,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginVertical: 6
                },
                multiline: inputText.isMultiline,
                blurOnSubmit: true,
                placeholder: inputText.placeholder,
                value: inputText.value,
                returnKeyType: 'done',
                underlineColorAndroid: 'transparent',
                importantForAccessibility: 'no-hide-descendants'
            }
        );
    }
}
