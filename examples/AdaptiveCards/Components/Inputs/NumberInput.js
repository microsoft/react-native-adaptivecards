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
        this.onFocus = () => {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        };
    }
    render() {
        return (React.createElement(InputBox, { placeholder: this.props.placeholder, value: this.props.value, keyboardType: Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric', returnKeyType: 'done', flex: this.props.flex, color: this.props.color, backgroundColor: this.props.backgroundColor, fontFamily: this.props.fontFamily, fontSize: this.props.fontSize, fontWeight: this.props.fontWeight, borderColor: this.props.borderColor, borderWidth: this.props.borderWidth, borderRadius: this.props.borderRadius, width: this.props.width, height: this.props.height, marginTop: this.props.marginTop, marginRight: this.props.marginRight, marginBottom: this.props.marginBottom, marginLeft: this.props.marginLeft, paddingTop: this.props.paddingTop, paddingRight: this.props.paddingRight, paddingBottom: this.props.paddingBottom, paddingLeft: this.props.paddingLeft, style: this.props.style, onValueChange: this.onChangeText, onBlur: this.onBlur, onFocus: this.onFocus }));
    }
}
