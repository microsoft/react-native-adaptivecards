import React from 'react';
import {
    TextInput,
} from 'react-native';

import { FormContext } from '../../Context/FormContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<TextInputElement> {
}

interface IState {
    value: string;
}

export class TextInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        let defaultValue = this.props.element.value;
        if (defaultValue === undefined) {
            defaultValue = '';
        }
        this.state = {
            value: defaultValue,
        };
        this.updateStore();
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
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginVertical: 6,
                    height: element.isMultiline ? 116 : 38
                }}
                multiline={element.isMultiline}
                blurOnSubmit={true}
                placeholder={element.placeholder}
                value={this.state.value}
                returnKeyType={'done'}
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
                onChangeText={this.onChangeText}
            />
        );
    }

    private onChangeText(input: string) {
        this.setState({
            value: input
        }, this.updateStore);
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.props.element.validateForm(this.state.value)
        );
    }
}
