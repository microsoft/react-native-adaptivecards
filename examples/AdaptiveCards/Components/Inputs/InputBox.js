import * as React from 'react';
import { TextInput } from 'react-native';
import { Column } from '../Containers/Column';
export class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', height: 'auto' },
            React.createElement(TextInput, { style: [
                    {
                        alignSelf: 'stretch',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginVertical: 6,
                        height: 38,
                    },
                    this.props.style
                ], multiline: this.props.multiline, keyboardType: this.props.keyboardType, blurOnSubmit: true, placeholder: this.props.placeholder, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.props.onValueChange, onFocus: this.props.onFocus, onBlur: this.props.onBlur })));
    }
}
