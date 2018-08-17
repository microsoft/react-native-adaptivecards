import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class NumberInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('NumberInputView onBlur');
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        };
        this.onFocus = () => {
            console.log('NumberInputView onFocus');
            let callback = HostContext.getInstance().getHandler('focus');
            if (callback) {
                callback();
            }
        };
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, this.updateStore);
        };
        this.validateInput = (input) => {
            if (this.props.element) {
                return this.props.element.validate(input);
            }
            return true;
        };
        const { element } = this.props;
        if (element && element.isValid) {
            let defaultValue = element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }
            if (NumberUtils.isNumber(element.value.toString())) {
                this.state = {
                    value: element.value.toString(),
                };
                this.updateStore();
            }
        }
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(InputBox, { placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur, onFocus: this.onFocus, validateInput: this.validateInput, theme: theme, marginTop: this.spacing }));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.validateInput(this.state.value));
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
