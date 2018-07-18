import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { StyleManager } from '../../Styles/StyleManager';
export class TextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('TextInputView onBlur');
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
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing) },
            React.createElement(InputBox, { vIndex: 0, hIndex: 0, placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur })));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
}
