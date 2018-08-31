import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class TextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('TextInputView onBlur');
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        };
        this.onFocus = () => {
            console.log('TextInputView onFocus');
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
            this.state = {
                value: defaultValue
            };
            this.updateStore();
        }
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(InputBox, { numberOfLines: this.numberOfLine, placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, validateInput: this.validateInput, onFocus: this.onFocus, onBlur: this.onBlur, theme: theme, marginTop: this.spacing }));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.validateInput(this.state.value));
    }
    get numberOfLine() {
        if (this.props.element.isMultiline) {
            return 4;
        }
        return 1;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
