import * as React from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    ScrollView,
    StyleProp,
    Text,
    TextInput,
    TextStyle,
    View
} from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { SeparateLine } from '../Basic/SeparateLine';

interface IProps {
    placeholder: string;
    value: string;
    labels: Array<{ title: string, }>;
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
    validateInput?: (input: string) => boolean;
}

interface IState {
    focused: boolean;
}

export class LabelInput extends React.Component<IProps, IState> {
    private inputBox: TextInput;
    constructor(props: IProps) {
        super(props);

        this.state = {
            focused: this.props.focused,
        };
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (!prevState.focused && this.props.focused) {
            this.setState({
                focused: true,
            }, () => {
                if (this.inputBox) {
                    this.inputBox.focus();
                }
            });
        }
    }

    public render() {
        return (
            <View
                style={{
                    flex: this.props.flex,
                }}
            >
                {this.renderInputArea()}
                {this.renderSuggestions()}
            </View>
        );
    }

    private renderInputArea() {
        return (
            <View
                style={{
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColor,
                    borderWidth: 1,
                    borderRadius: 4,
                    width: this.props.width,
                    height: this.height,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                }}
            >
                {this.renderLabels()}
                {this.renderInputBox()}
            </View>
        );
    }

    private renderLabels() {
        if (this.props.labels) {
            return this.props.labels.map((label, index) => {
                return (
                    <Text
                        key={'Label' + index}
                        style={{
                            fontSize: this.fontSize,
                            fontWeight: this.fontWeight,
                            color: this.backgroundColor,
                            backgroundColor: this.color,
                            paddingTop: this.paddingVertical - 6,
                            paddingBottom: this.paddingVertical - 6,
                            borderRadius: 4,
                            paddingLeft: 6,
                            paddingRight: 6,
                            marginTop: 6,
                            marginBottom: 6,
                            marginLeft: 6,
                        }}
                    >
                        {label.title}
                    </Text>
                );
            });
        }
        return undefined;
    }

    private renderInputBox() {
        return (
            <TextInput
                ref={ref => this.inputBox = ref}
                style={[
                    {
                        flex: 1,
                        color: this.color,
                        fontSize: this.fontSize,
                        lineHeight: this.lineHeight,
                        fontWeight: this.fontWeight,
                        backgroundColor: this.backgroundColor,
                        borderRadius: 4,
                        height: this.height - 2,
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
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
                onChangeText={this.onValueChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }

    private renderSuggestions() {
        if (this.props.suggestionView) {
            return [
                <SeparateLine
                    key={0}
                />,
                <ScrollView
                    key={1}
                    style={{
                        maxHeight: 200
                    }}
                >
                    {this.props.suggestionView}
                </ScrollView>
            ];
        }
        return undefined;
    }

    private onValueChange = (value: string) => {
        if (this.props.onRequestSuggestion) {
            this.props.onRequestSuggestion(value);
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

    private get fontSize() {
        return StyleManager.getFontSize('default');
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default');
    }

    private get lineHeight() {
        return this.fontSize * 1.2;
    }
    
    private get height() {
        return this.lineHeight + this.paddingVertical * 2 + 2;
    }

    private get paddingVertical() {
        return 12;
    }

    private get paddingHorizontal() {
        return 12;
    }

    private get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme);
        } else {
            return StyleManager.getInputColor(this.props.theme);
        }
    }

    private get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme);
        } else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }

    private get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme);
        } else {
            return StyleManager.getInputBorderColor(this.props.theme);
        }
    }
}
