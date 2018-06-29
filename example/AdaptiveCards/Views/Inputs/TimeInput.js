import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { TimeInput } from '../../Components/Inputs/TimeInput';
import { FormContext } from '../../Contexts/FormContext';
import { StyleManager } from '../../Styles/StyleManager';
export class TimeInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, this.updateStore);
        };
        const { element } = this.props;
        if (element && element.isValid()) {
            this.state = {
                value: this.props.element.value,
            };
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: this.styleConfig.spacing },
            React.createElement(TimeInput, { vIndex: 0, hIndex: 0, value: this.state.value, onValueChange: this.onValueChange, validateInput: element.validateForm })));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validateForm(this.state.value));
    }
}
