import React from 'react';
import { TextInput, } from 'react-native';
import { FormContext } from '../../Context/FormContext';
export class TextInputView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.state = {
            value: this.props.element.value,
        };
        this.updateStore();
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
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginVertical: 6,
                height: element.isMultiline ? 116 : 38
            }, multiline: element.isMultiline, blurOnSubmit: true, placeholder: element.placeholder, value: this.state.value, returnKeyType: 'done', underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onChangeText }));
    }
    onChangeText(input) {
        this.setState({
            value: input
        }, this.updateStore);
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value);
    }
}
