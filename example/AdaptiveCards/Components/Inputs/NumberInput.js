import * as React from 'react';
import { Platform } from 'react-native';
import { NumberUtils } from '../../Utils/NumberUtils';
import { InputBox } from './InputBox';
export class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = (input) => {
            if (this.props.onValueChange) {
                if (NumberUtils.isSymbol(input) || NumberUtils.isNumber(input)) {
                    this.props.onValueChange(input);
                }
            }
        };
        this.onBlur = () => {
            if (this.props.validateInput) {
                if (this.props.validateInput(this.props.value)) {
                    console.log('NumberInput: valid');
                }
                else {
                    console.log('NumberInput: invalid');
                }
            }
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        };
    }
    render() {
        return (React.createElement(InputBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, multiline: false, keyboardType: Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric', placeholder: this.props.placeholder, value: this.props.value, returnKeyType: 'done', onValueChange: this.onChangeText, onBlur: this.onBlur }));
    }
}
