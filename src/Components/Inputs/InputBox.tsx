import * as React from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextStyle,
} from 'react-native';

interface IProps {
    placeholder: string;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    numberOfLines?: number;
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
    onFocus?: () => void;
    onBlur?: () => void;
    validateInput?: (input: string) => boolean;
}

export class InputBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <TextInput
                style={[
                    {
                        flex: this.props.flex,
                        color: this.props.color,
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        backgroundColor: this.props.backgroundColor,
                        width: this.props.width,
                        height: this.props.height,
                        borderColor: this.props.borderColor,
                        borderWidth: this.props.borderWidth,
                        borderRadius: this.props.borderRadius,
                        marginTop: this.props.marginTop,
                        marginRight: this.props.marginRight,
                        marginBottom: this.props.marginBottom,
                        marginLeft: this.props.marginLeft,
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft,
                    },
                    this.props.style
                ]}
                multiline={this.isMultiLine}
                numberOfLines={this.props.numberOfLines}
                keyboardType={this.props.keyboardType}
                blurOnSubmit={!this.isMultiLine}
                placeholder={this.props.placeholder}
                value={this.props.value}
                returnKeyType={this.props.returnKeyType}
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
                onChangeText={this.onChangeText}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }

    private onChangeText = (input: string) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(input);
        }
    }

    private onBlur = () => {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('Input: valid');
            } else {
                console.log('Input: invalid');
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

    private get isMultiLine() {
        return this.props.numberOfLines && this.props.numberOfLines > 1;
    }
}
