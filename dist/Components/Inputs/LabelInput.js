import * as React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { SeparateLine } from '../Basic/SeparateLine';
export class LabelInput extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            if (this.props.onRequestSuggestion) {
                this.props.onRequestSuggestion(value);
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
        };
    }
    componentDidUpdate(prevProps, prevState) {
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
                borderWidth: 1,
                borderRadius: 4,
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
                return (React.createElement(Text, { key: 'Label' + index, style: {
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
                    } }, label.title));
            });
        }
        return undefined;
    }
    renderInputBox() {
        return (React.createElement(TextInput, { ref: ref => this.inputBox = ref, style: [
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
            ], multiline: this.isMultiLine, numberOfLines: this.props.numberOfLines, keyboardType: this.props.keyboardType, blurOnSubmit: !this.isMultiLine, placeholder: this.props.placeholder, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur }));
    }
    renderSuggestions() {
        if (this.props.suggestionView) {
            return [
                React.createElement(SeparateLine, { key: 0 }),
                React.createElement(ScrollView, { key: 1, style: {
                        maxHeight: 200
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
}
