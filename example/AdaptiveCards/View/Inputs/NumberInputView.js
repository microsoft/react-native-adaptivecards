import React from 'react';
import { Platform, TextInput, } from 'react-native';
import { FormContext } from '../../Context/FormContext';
import { Utils } from '../../Shared/Utils';
export class NumberInputView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onBlur = this.onBlur.bind(this);
        let defaultValue = this.props.element.value;
        if (defaultValue === undefined) {
            defaultValue = '';
        }
        if (Utils.isNumber(this.props.element.value.toString())) {
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
            }, multiline: false, keyboardType: Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric', blurOnSubmit: true, placeholder: element.placeholder, value: this.state.value, returnKeyType: 'done', underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onChangeText, onBlur: this.onBlur }));
    }
    onChangeText(input) {
        if (Utils.isSymbol(input) || Utils.isNumber(input)) {
            console.log('change text');
            this.setState({
                value: input
            }, this.updateStore);
        }
    }
    onBlur() {
        if (this.props.element.validateForm(this.state.value)) {
            console.log('NumberInput: valide');
        }
        else {
            console.log('NumberInput: invalide');
        }
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validateForm(this.state.value));
    }
}
