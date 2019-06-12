import * as React from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleProp, TextStyle } from 'react-native';
interface IProps {
    placeholder: string;
    value: string;
    labels: Array<{
        title: string;
    }>;
    suggestionView: JSX.Element;
    focused: boolean;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    numberOfLines?: number;
    theme?: 'default' | 'emphasis';
    flex?: number;
    width?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    style?: StyleProp<TextStyle>;
    onRequestSuggestion?: (input: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onLabelRemove?: (index: number) => void;
    validateInput?: (input: string) => boolean;
}
interface IState {
    focused: boolean;
    labelFocusIndex: number;
}
export declare class LabelInput extends React.Component<IProps, IState> {
    private inputBox;
    constructor(props: IProps);
    componentDidUpdate(prevProps: IProps, prevState: IState): void;
    render(): JSX.Element;
    private renderInputArea;
    private renderLabels;
    private renderInputBox;
    private renderSuggestions;
    private onValueChange;
    private onLabelPress;
    private onKeyPress;
    private onSubmitEditing;
    private onBlur;
    private focusInput;
    private onFocus;
    private validateInput;
    private readonly accessibilityLabel;
    private readonly labelLength;
    private readonly isMultiLine;
    private readonly fontSize;
    private readonly fontWeight;
    private readonly lineHeight;
    private readonly height;
    private readonly paddingVertical;
    private readonly paddingHorizontal;
    private readonly color;
    private readonly backgroundColor;
    private readonly borderColor;
    private readonly placeholderColor;
}
export {};
