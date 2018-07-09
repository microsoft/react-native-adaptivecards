import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { NumberInput } from '../../Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { NumberUtils } from '../../Shared/Utils';
import { StyleManager } from '../../Styles/StyleManager';
export class NumberInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('NumberInputView onBlur');
        };
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, this.updateStore);
        };
        const { element } = this.props;
        if (element && element.isValid()) {
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
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: this.styleConfig.spacing },
            React.createElement(NumberInput, { vIndex: 0, hIndex: 0, placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur, validateInput: element.validateForm })));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validateForm(this.state.value));
    }
}
