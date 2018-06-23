import * as React from 'react';
import { InputElement, InputElementType } from '../../Schema/Base/InputElement';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { DateInputView } from '../Inputs/DateInputView';
import { NumberInputView } from '../Inputs/NumberInputView';
import { TextInputView } from '../Inputs/TextInputView';

export class InputFactory {

    public static createView(element: InputElement, index: number) {
        if (element) {
            switch (element.type) {
                case InputElementType.TextInput:
                    return (
                        <TextInputView
                            key={'TextInputView' + index}
                            element={element as TextInputElement}
                            index={index} />
                    );
                case InputElementType.NumberInput:
                    return (
                        <NumberInputView
                            key={'NumberInputView' + index}
                            element={element as NumberInputElement}
                            index={index}
                        />
                    );
                case InputElementType.DateInput:
                    return (
                        <DateInputView
                            key={'DateInputView' + index}
                            element={element as DateInputElement}
                            index={index}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
