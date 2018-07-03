import * as React from 'react';
import { Platform } from 'react-native';
import { NumberUtils } from '../../Shared/Utils';
import { InputBox } from './InputBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    placeholder: string;
    value: string;
    style?: any;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
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
            />
        );
    }

    private onChangeText = (input: string) => {
        if (this.props.onValueChange) {
            if (NumberUtils.isSymbol(input) || NumberUtils.isNumber(input)) {
                console.log('change text');
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
}
