import React from 'react';
import {
    TextInput,
} from 'react-native';

import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { ICardElementViewProps, IInputFieldProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps, IInputFieldProps {
    inputText: TextInputElement;
}
interface IState {
}

export class TextInputView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { inputText } = this.props;

        if (!inputText || !inputText.isValid()) {
            return null;
        }

        return (
            <TextInput
                style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginVertical: 6,
                    height: inputText.isMultiline ? 116 : 38
                }}
                multiline={inputText.isMultiline}
                blurOnSubmit={true}
                placeholder={inputText.placeholder}
                value={inputText.value}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
            />
        );
    }
}
