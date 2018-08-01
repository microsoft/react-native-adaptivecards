import * as React from 'react';
import { Row } from '../../Abandon/Components/Containers/Row';
import { TimeInput } from '../../Abandon/Components/Inputs/TimeInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
export class TimeInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('TimeInputView onBlur');
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        };
        this.onFocus = () => {
            console.log('TimeInputView onFocus');
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
            this.state = {
                value: this.props.element.value,
            };
            this.updateStore();
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing), width: 'stretch', height: 'auto' },
            React.createElement(TimeInput, { vIndex: 0, hIndex: 0, value: this.state.value, onValueChange: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur, validateInput: element.validate })));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
}
