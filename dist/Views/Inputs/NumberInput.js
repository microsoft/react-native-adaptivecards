import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { NumberInput } from '../../Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
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
        const { element } = this.props;
        if (element && element.isValid) {
            let defaultValue = this.props.element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }
            if (NumberUtils.isNumber(this.props.element.value.toString())) {
                this.state = {
                    value: this.props.element.value.toString(),
                };
                this.updateStore();
            }
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing) },
            React.createElement(NumberInput, { vIndex: 0, hIndex: 0, placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur, onFocus: this.onFocus, validateInput: element.validate })));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
}
