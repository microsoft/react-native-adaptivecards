import React from 'react';
import {
    Platform,
    TextInput,
} from 'react-native';

import { FormContext } from '../../Context/FormContext';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { Utils } from '../../Shared/Utils';
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
        this.onBlur = this.onBlur.bind(this);
        if (Utils.isNumber(this.props.element.value.toString())) {
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
                onBlur={this.onBlur}
            />
        );
    }

    private onChangeText(input: string) {
        if (Utils.isSymbol(input) || Utils.isNumber(input)) {
            console.log('change text');
            this.setState({
                value: input
            }, this.updateStore);
        }
    }

    private onBlur() {
        if (this.props.element.validateForm(this.state.value)) {
            console.log('NumberInput: valide');
        } else {
            console.log('NumberInput: invalide');
        }
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.props.element.validateForm(this.state.value)
        );
    }
}
