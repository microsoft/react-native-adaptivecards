import * as React from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextStyle,
} from 'react-native';
import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';

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
    config: HostConfig;
    onValueChange?: (input: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    validateInput?: (input: string) => boolean;
}

interface IState {
    focused: boolean;
}

export class InputBox extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            focused: false,
        };
    }

    public render() {
        return (
            <TextInput
                style={[
                    {
                        flex: this.props.flex,
                        color: this.color,
                        fontSize: this.fontSize,
                        lineHeight: this.lineHeight,
                        fontWeight: this.fontWeight,
                        backgroundColor: this.backgroundColor,
                        width: this.props.width,
                        height: this.props.height || this.height,
                        borderColor: this.borderColor,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginTop: this.props.marginTop,
                        marginRight: this.props.marginRight,
                        marginBottom: this.props.marginBottom,
                        marginLeft: this.props.marginLeft,
                        paddingTop: this.paddingVertical,
                        paddingRight: this.paddingHorizontal,
                        paddingBottom: this.paddingVertical,
                        paddingLeft: this.paddingHorizontal,
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
                underlineColorAndroid='transparent'
                importantForAccessibility='no-hide-descendants'
                onChangeText={this.onValueChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }

    private onValueChange = (value: string) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
    }

    private onBlur = () => {
        this.setState({ focused: false }, () => {
            this.validateInput();
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        });
    }

    private onFocus = () => {
        this.setState({
            focused: true
        }, () => {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        });
    }

    private validateInput() {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('Input: valid');
            } else {
                console.log('Input: invalid');
            }
        }
    }

    private get isMultiLine() {
        return this.props.numberOfLines && this.props.numberOfLines > 1;
    }

    private get lineHeight() {
        return this.fontSize * 1.2;
    }

    private get fontSize() {
        return StyleManager.getFontSize('default', this.props.config);
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default', this.props.config);
    }

    private get paddingVertical() {
        return 12;
    }

    private get paddingHorizontal() {
        return 12;
    }

    private get numberOfLine() {
        if (this.props.numberOfLines && this.props.numberOfLines > 0) {
            return this.props.numberOfLines;
        }
        return 1;
    }

    private get height() {
        return this.lineHeight * this.numberOfLine + this.paddingVertical * 2 + 2;
    }

    private get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme, this.props.config);
        } else {
            return StyleManager.getInputColor(this.props.theme, this.props.config);
        }
    }

    private get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme, this.props.config);
        } else {
            return StyleManager.getInputBackgroundColor(this.props.theme, this.props.config);
        }
    }

    private get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme, this.props.config);
        } else {
            return StyleManager.getInputBorderColor(this.props.theme, this.props.config);
        }
    }
}
