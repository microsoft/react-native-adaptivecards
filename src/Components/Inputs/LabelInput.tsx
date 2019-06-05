import * as React from 'react';
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    ReturnKeyTypeOptions,
    ScrollView,
    StyleProp,
    TextInput,
    TextInputKeyPressEventData,
    TextStyle,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { EmailUtils } from '../../Utils/EmailUtils';
import { Label } from '../Basic/Label';
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
    onLabelRemove?: (index: number) => void;
    validateInput?: (input: string) => boolean;
}

interface IState {
    focused: boolean;
    labelFocusIndex: number;
}

export class LabelInput extends React.Component<IProps, IState> {
    private inputBox: TextInput;
    constructor(props: IProps) {
        super(props);

        this.state = {
            focused: this.props.focused,
            labelFocusIndex: this.props.labels ? this.props.labels.length : 0
        };
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if ((!prevState.focused && this.props.focused) || (prevProps.labels.length !== this.labelLength)) {
            this.setState({
                focused: this.props.focused,
                labelFocusIndex: this.labelLength
            }, () => {
                if (this.state.focused) {
                    if (this.inputBox) {
                        this.inputBox.focus();
                    }
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
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    width: this.props.width,
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
                    <Label
                        key={'Label' + index}
                        index={index}
                        title={label.title}
                        focused={index === this.state.labelFocusIndex}
                        theme={'default'}
                        accessibilityLabel={`${this.props.placeholder} ${label.title}`}
                        onPress={this.onLabelPress}
                    >
                        {label.title}
                    </Label>
                );
            });
        }
        return undefined;
    }

    private renderInputBox() {
        return (
            <TouchableWithoutFeedback 
                style={{
                    flex: 1,
                }}
                onPress={this.focusInput}
                accessible={true}
                accessibilityLabel={this.props.value ? this.props.value : this.props.placeholder}
                accessibilityHint={'edit box double tap to activate'} >
                <View 
                    style={{
                        flex: 1,
                        paddingRight: this.paddingHorizontal,
                        paddingLeft: this.paddingHorizontal,
                    }}>
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
                                height: this.height,
                                paddingTop: this.paddingVertical,
                                paddingBottom: this.paddingVertical,
                            },
                            this.props.style
                        ]}
                        autoCorrect={false}
                        autoCapitalize='none'
                        multiline={this.isMultiLine}
                        numberOfLines={this.props.numberOfLines}
                        keyboardType={this.props.keyboardType}
                        blurOnSubmit={!this.isMultiLine}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.placeholderColor}
                        value={this.props.value}
                        returnKeyType={this.props.returnKeyType}
                        underlineColorAndroid='transparent'
                        importantForAccessibility='no-hide-descendants'
                        onChangeText={this.onValueChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyPress={this.onKeyPress}
                        onSubmitEditing={this.onSubmitEditing}
                    />
                </View>
            </TouchableWithoutFeedback>
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
                        maxHeight: 200,
                        paddingLeft: 1,
                        paddingRight: 1,
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

    private onLabelPress = (index: number) => {
        if (index !== undefined) {
            if (index === this.state.labelFocusIndex) {
                this.setState({
                    labelFocusIndex: this.labelLength,
                });
            } else {
                this.setState({
                    labelFocusIndex: index
                });
            }
        }
    }

    private onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if ((e as any).nativeEvent.key === 'Backspace') {
            if (this.props.value === '') {
                if (this.labelLength === this.state.labelFocusIndex) {
                    if (this.state.labelFocusIndex > 0) {
                        this.setState({
                            labelFocusIndex: this.state.labelFocusIndex - 1
                        });
                    }
                } else {
                    if (this.props.onLabelRemove) {
                        this.props.onLabelRemove(this.state.labelFocusIndex);
                    }
                }
            }
        }
        if ((e as any).nativeEvent.key === 'Enter') {
            this.onSubmitEditing();
        }
    }

    private onSubmitEditing = () => {
        if (EmailUtils.isEmail(this.props.value)) {
            if (this.props.onRequestSuggestion) {
                this.props.onRequestSuggestion(this.props.value + ' ');
            }
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

    private focusInput = () => {
        if (this.inputBox) {
            this.inputBox.focus();
        }
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

    private get labelLength() {
        return this.props.labels ? this.props.labels.length : 0;
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

    private get placeholderColor() {
        return StyleManager.getInputBorderColor(this.props.theme);
    }
}
