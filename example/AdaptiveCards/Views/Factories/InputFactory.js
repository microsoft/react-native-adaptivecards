import * as React from 'react';
import { InputElementType } from '../../Schema/Base/InputElement';
import { DateInputView } from '../Inputs/DateInputView';
import { NumberInputView } from '../Inputs/NumberInputView';
import { TextInputView } from '../Inputs/TextInputView';
export class InputFactory {
    static createView(element, index) {
        if (element) {
            switch (element.type) {
                case InputElementType.TextInput:
                    return (React.createElement(TextInputView, { key: 'TextInputView' + index, element: element, index: index }));
                case InputElementType.NumberInput:
                    return (React.createElement(NumberInputView, { key: 'NumberInputView' + index, element: element, index: index }));
                case InputElementType.DateInput:
                    return (React.createElement(DateInputView, { key: 'DateInputView' + index, element: element, index: index }));
                default:
                    return null;
            }
        }
        return null;
    }
}
