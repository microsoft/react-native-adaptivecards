import * as React from 'react';
import { InputElement, InputElementType } from '../../Schema/Base/InputElement';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { DateInputView } from '../Inputs/DateInputView';
import { NumberInputView } from '../Inputs/NumberInputView';
import { TextInputView } from '../Inputs/TextInputView';
import { IInputElementViewProps } from '../Shared/BaseProps';

interface IProps extends IInputElementViewProps<InputElement> {

}

export class InputElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case InputElementType.TextInput:
                    return (
                        <TextInputView
                            element={this.props.element as TextInputElement}
                            index={this.props.index} />
                    );
                case InputElementType.NumberInput:
                    return (
                        <NumberInputView
                            element={this.props.element as NumberInputElement}
                            index={this.props.index}
                        />
                    );
                case InputElementType.DateInput:
                    return (
                        <DateInputView
                            element={this.props.element as DateInputElement}
                            index={this.props.index}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
