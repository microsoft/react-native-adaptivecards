import * as React from 'react';
import { ScrollView, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { EmailUtils } from '../../Utils/EmailUtils';
import { Label } from '../Basic/Label';
import { SeparateLine } from '../Basic/SeparateLine';
export class LabelInput extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            if (this.props.onRequestSuggestion) {
                this.props.onRequestSuggestion(value);
            }
        };
        this.onLabelPress = (index) => {
            if (index !== undefined) {
                if (index === this.state.labelFocusIndex) {
                    this.setState({
                        labelFocusIndex: this.labelLength,
                    });
                }
                else {
                    this.setState({
                        labelFocusIndex: index
                    });
                }
            }
        };
        this.onKeyPress = (e) => {
            if (e.nativeEvent.key === 'Backspace') {
                if (this.props.value === '') {
                    if (this.labelLength === this.state.labelFocusIndex) {
                        if (this.state.labelFocusIndex > 0) {
                            this.setState({
                                labelFocusIndex: this.state.labelFocusIndex - 1
                            });
                        }
                    }
                    else {
                        if (this.props.onLabelRemove) {
                            this.props.onLabelRemove(this.state.labelFocusIndex);
                        }
                    }
                }
            }
            if (e.nativeEvent.key === 'Enter') {
                this.onSubmitEditing();
            }
        };
        this.onSubmitEditing = () => {
            if (EmailUtils.isEmail(this.props.value)) {
                if (this.props.onRequestSuggestion) {
                    this.props.onRequestSuggestion(this.props.value + ' ');
                }
            }
        };
        this.onBlur = () => {
            this.setState({ focused: false }, () => {
                this.validateInput();
                if (this.props.onBlur) {
                    this.props.onBlur();
                }
            });
        };
        this.focusInput = () => {
            if (this.inputBox) {
                this.inputBox.focus();
            }
        };
        this.onFocus = () => {
            this.setState({
                focused: true
            }, () => {
                if (this.props.onFocus) {
                    this.props.onFocus();
                }
            });
        };
        this.state = {
            focused: this.props.focused,
            labelFocusIndex: this.props.labels ? this.props.labels.length : 0
        };
    }
    componentDidUpdate(prevProps, prevState) {
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
    render() {
        return (React.createElement(View, { style: {
                flex: this.props.flex,
            } },
            this.renderInputArea(),
            this.renderSuggestions()));
    }
    renderInputArea() {
        return (React.createElement(View, { style: {
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
            } },
            this.renderLabels(),
            this.renderInputBox()));
    }
    renderLabels() {
        if (this.props.labels) {
            return this.props.labels.map((label, index) => {
                return (React.createElement(Label, { key: 'Label' + index, index: index, title: label.title, focused: index === this.state.labelFocusIndex, theme: 'default', accessibilityLabel: `${this.props.placeholder} ${label.title}`, onPress: this.onLabelPress }, label.title));
            });
        }
        return undefined;
    }
    renderInputBox() {
        return (React.createElement(TouchableWithoutFeedback, { style: {
                flex: 1,
            }, onPress: this.focusInput, accessible: true, accessibilityLabel: this.accessibilityLabel, accessibilityHint: 'edit box double tap to activate' },
            React.createElement(View, { style: {
                    flex: 1,
                    paddingRight: this.paddingHorizontal,
                    paddingLeft: this.paddingHorizontal,
                } },
                React.createElement(TextInput, { ref: ref => this.inputBox = ref, style: [
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
                    ], autoCorrect: false, autoCapitalize: 'none', multiline: this.isMultiLine, numberOfLines: this.props.numberOfLines, keyboardType: this.props.keyboardType, blurOnSubmit: !this.isMultiLine, placeholder: this.props.placeholder, placeholderTextColor: this.placeholderColor, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur, onKeyPress: this.onKeyPress, onSubmitEditing: this.onSubmitEditing }))));
    }
    renderSuggestions() {
        if (this.props.suggestionView) {
            return [
                React.createElement(SeparateLine, { key: 0 }),
                React.createElement(ScrollView, { key: 1, style: {
                        maxHeight: 200,
                        paddingLeft: 1,
                        paddingRight: 1,
                    } }, this.props.suggestionView)
            ];
        }
        return undefined;
    }
    validateInput() {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('Input: valid');
            }
            else {
                console.log('Input: invalid');
            }
        }
    }
    get accessibilityLabel() {
        if (this.props.value && typeof this.props.value === 'string') {
            return this.props.value.toLocaleLowerCase();
        }
        else if (this.props.placeholder && typeof this.props.placeholder === 'string') {
            return this.props.placeholder.toLocaleLowerCase();
        }
        else {
            return '';
        }
    }
    get labelLength() {
        return this.props.labels ? this.props.labels.length : 0;
    }
    get isMultiLine() {
        return this.props.numberOfLines && this.props.numberOfLines > 1;
    }
    get fontSize() {
        return StyleManager.getFontSize('default');
    }
    get fontWeight() {
        return StyleManager.getFontWeight('default');
    }
    get lineHeight() {
        return this.fontSize * 1.2;
    }
    get height() {
        return this.lineHeight + this.paddingVertical * 2 + 2;
    }
    get paddingVertical() {
        return 12;
    }
    get paddingHorizontal() {
        return 12;
    }
    get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme);
        }
        else {
            return StyleManager.getInputColor(this.props.theme);
        }
    }
    get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme);
        }
        else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }
    get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme);
        }
        else {
            return StyleManager.getInputBorderColor(this.props.theme);
        }
    }
    get placeholderColor() {
        return StyleManager.getInputBorderColor(this.props.theme);
    }
}
