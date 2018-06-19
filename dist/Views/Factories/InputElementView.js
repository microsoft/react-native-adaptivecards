import * as React from 'react';
import { InputElementType } from '../../Schema/Base/InputElement';
import { DateInputView } from '../Inputs/DateInputView';
import { NumberInputView } from '../Inputs/NumberInputView';
import { TextInputView } from '../Inputs/TextInputView';
export class InputElementView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case InputElementType.TextInput:
                    return (React.createElement(TextInputView, { element: this.props.element, index: this.props.index }));
                case InputElementType.NumberInput:
                    return (React.createElement(NumberInputView, { element: this.props.element, index: this.props.index }));
                case InputElementType.DateInput:
                    return (React.createElement(DateInputView, { element: this.props.element, index: this.props.index }));
                default:
                    return null;
            }
        }
        return null;
    }
}
