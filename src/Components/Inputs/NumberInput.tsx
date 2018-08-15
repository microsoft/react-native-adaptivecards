import * as React from 'react';
import { Platform, StyleProp, TextStyle } from 'react-native';
import { NumberUtils } from '../../Utils/NumberUtils';
import { InputBox } from './InputBox';

interface IProps {
    placeholder: string;
    value: string;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    flex?: number;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<TextStyle>;
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
                placeholder={this.props.placeholder}
                value={this.props.value}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                returnKeyType={'done'}
                flex={this.props.flex}
                color={this.props.color}
                backgroundColor={this.props.backgroundColor}
                fontFamily={this.props.fontFamily}
                fontSize={this.props.fontSize}
                fontWeight={this.props.fontWeight}
                borderColor={this.props.borderColor}
                borderWidth={this.props.borderWidth}
                borderRadius={this.props.borderRadius}
                width={this.props.width}
                height={this.props.height}
                marginTop={this.props.marginTop}
                marginRight={this.props.marginRight}
                marginBottom={this.props.marginBottom}
                marginLeft={this.props.marginLeft}
                paddingTop={this.props.paddingTop}
                paddingRight={this.props.paddingRight}
                paddingBottom={this.props.paddingBottom}
                paddingLeft={this.props.paddingLeft}
                style={this.props.style}
                onValueChange={this.onChangeText}
                validateInput={this.onValidate}
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
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    private onValidate = (input: string) => {
        if (this.props.validateInput) {
            return this.props.validateInput(input);
        }
        return true;
    } 

    private onFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }
}
