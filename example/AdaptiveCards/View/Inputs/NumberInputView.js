import React from 'react';
import { Platform, TextInput, } from 'react-native';
import { InputContext } from '../../Context/InputContext';
export class NumberInputView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        if (this.isNumber(this.props.element.value.toString())) {
            this.state = {
                value: this.props.element.value.toString(),
            };
            this.updateStore();
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(TextInput, { style: {
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginVertical: 6,
                height: 38
            }, multiline: false, keyboardType: Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric', blurOnSubmit: true, placeholder: element.placeholder, value: this.state.value, returnKeyType: 'done', underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onChangeText }));
    }
    onChangeText(input) {
        if (this.isSymbol(input) || this.isNumber(input)) {
            console.log('change text');
            this.setState({
                value: input
            }, this.updateStore);
        }
    }
    isNumber(value) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }
    isSymbol(value) {
        return /^(\+|-)?$/.test(value);
    }
    updateStore() {
        const value = this.state.value;
        let finalValue;
        if (this.isNumber(value)) {
            finalValue = value;
        }
        if (this.isSymbol(value)) {
            finalValue = this.props.element.value.toString();
        }
        if (finalValue.endsWith('.')) {
            finalValue = value.slice(0, -1);
        }
        InputContext.getInstance().updateField(this.props.element.id, finalValue);
    }
}
