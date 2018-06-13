import React from 'react';
import {
    TextInput,
} from 'react-native';

import { InputContext } from '../../Context/InputContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<TextInputElement> {
}

interface IState {
}

export class TextInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeText(this.props.element.value);
    }

    render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
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
                    height: element.isMultiline ? 116 : 38
                }}
                multiline={element.isMultiline}
                blurOnSubmit={true}
                placeholder={element.placeholder}
                value={element.value}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
                onChangeText={this.onChangeText}
            />
        );
    }

    private onChangeText(input: string) {
        InputContext.getInstance().updateField(this.props.element.id, input);
    }
}
