import * as React from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleProp, TextStyle } from 'react-native';
interface IProps {
    placeholder: string;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    numberOfLines?: number;
    theme?: 'default' | 'emphasis';
    flex?: number;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    style?: StyleProp<TextStyle>;
    onValueChange?: (input: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    validateInput?: (input: string) => boolean;
}
interface IState {
    focused: boolean;
}
export declare class InputBox extends React.Component<IProps, IState> {
    private textInputRef;
    constructor(props: IProps);
    render(): JSX.Element;
    private focusInput;
    private onValueChange;
    private onBlur;
    private onFocus;
    private validateInput;
    private readonly accessibilityLabel;
    private readonly isMultiLine;
    private readonly lineHeight;
    private readonly fontSize;
    private readonly fontWeight;
    private readonly paddingVertical;
    private readonly paddingHorizontal;
    private readonly numberOfLine;
    private readonly height;
    private readonly color;
    private readonly backgroundColor;
    private readonly borderColor;
    private readonly placeholderColor;
}
export {};
