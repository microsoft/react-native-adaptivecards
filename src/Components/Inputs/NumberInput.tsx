import * as React from 'react';
import { Platform } from 'react-native';
import { NumberUtils } from '../../Utils/NumberUtils';
import { InputBox } from './InputBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    placeholder: string;
    value: string;
    style?: any;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class NumberInput extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {

        return (
            <InputBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                multiline={false}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                placeholder={this.props.placeholder}
                value={this.props.value}
                returnKeyType={'done'}
                onValueChange={this.onChangeText}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
            />
        );
    }

    private onChangeText = (input: string) => {
        if (this.props.onValueChange) {
            if (NumberUtils.isSymbol(input) || NumberUtils.isNumber(input)) {
                this.props.onValueChange(input);
            }
        }
    }

    private onBlur = () => {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('NumberInput: valid');
            } else {
                console.log('NumberInput: invalid');
            }
        }
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    private onFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }
}
