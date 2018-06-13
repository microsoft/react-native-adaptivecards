import React from 'react';
import {
    Platform,
    TextInput,
} from 'react-native';

import { NumberInputElement } from 'Schema/Inputs/NumberInput';
import { InputContext } from '../../Context/InputContext';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<NumberInputElement> {
}

interface IState {
    value: string;
}

export class NumberInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        if (this.isNumber(this.props.element.value.toString())) {
            this.state = {
                value: this.props.element.value.toString(),
            };
            this.updateStore();
        }
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
                    height: 38
                }}
                multiline={false}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
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
        if (this.isSymbol(input) || this.isNumber(input)) {
            console.log('change text');
            this.setState({
                value: input
            }, this.updateStore);
        }
    }

    private isNumber(value: string) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }

    private isSymbol(value: string) {
        return /^(\+|-)?$/.test(value);
    }

    private updateStore() {
        const value = this.state.value;
        let finalValue: string;
        if (this.isNumber(value)) {
            finalValue = value;
        }
        if (this.isSymbol(value)) {
            finalValue = this.props.element.value.toString();
        }
        if (finalValue.endsWith('.')) {
            finalValue = value.slice(0, -1);
        }
        InputContext.getInstance().updateField(this.props.element.id, finalValue);
    }
}
