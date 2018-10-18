var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { TimePanel } from '../../Components/Inputs/TimePanel';
import { safe } from '../../Components/Shared/Safe';
import { StyleManager } from '../../Styles/StyleManager';
let TimeInputView = class TimeInputView extends React.Component {
    constructor(props) {
        super(props);
        this.tempValue = '';
        this.onValueChange = (value) => {
            this.tempValue = value;
        };
        this.onCancel = () => {
            this.setState({
                focused: false,
            }, () => {
                const { model, context } = this.props;
                this.tempValue = model.value;
                let callback = context.host.onBlur;
                if (callback) {
                    callback();
                }
            });
        };
        this.onSave = () => {
            this.setState({
                focused: false,
            }, () => {
                const { model, context } = this.props;
                if (model) {
                    model.onInput(this.tempValue, context);
                    context.host.onBlur();
                }
            });
        };
        this.onPress = () => {
            const { model, context } = this.props;
            if (model) {
                this.tempValue = model.value;
                this.setState({
                    focused: !this.state.focused,
                }, () => {
                    if (this.state.focused) {
                        context.host.onFocus();
                    }
                    else {
                        context.host.onBlur();
                    }
                });
            }
        };
        this.state = {
            focused: false,
        };
    }
    render() {
        const { model, context, index } = this.props;
        return ([
            React.createElement(Button, { key: 'TimeInputButton' + index, title: model.value, color: this.color, backgroundColor: this.backgroundColor, borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, height: this.height, fontSize: this.fontSize, fontWeight: this.fontWeight, textHorizontalAlign: 'center', textVerticalAlign: 'center', marginTop: this.spacing, paddingLeft: this.paddingHorizontal, paddingRight: this.paddingHorizontal, paddingTop: this.paddingVertical, paddingBottom: this.paddingVertical, onPress: this.onPress }),
            React.createElement(TimePanel, { key: 'TimePanel' + index, value: model.value, config: context.config, show: this.state.focused, onValueChange: this.onValueChange, onSave: this.onSave, onCancel: this.onCancel })
        ]);
    }
    get fontSize() {
        return StyleManager.getFontSize('default', this.props.context.config);
    }
    get fontWeight() {
        return StyleManager.getFontWeight('default', this.props.context.config);
    }
    get paddingVertical() {
        return 12;
    }
    get paddingHorizontal() {
        return 12;
    }
    get numberOfLine() {
        return 1;
    }
    get height() {
        return this.fontSize * this.numberOfLine + this.paddingVertical * 2 + 2;
    }
    get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme, this.props.context.config);
        }
        else {
            return StyleManager.getInputColor(this.props.theme, this.props.context.config);
        }
    }
    get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme, this.props.context.config);
        }
        else {
            return StyleManager.getInputBackgroundColor(this.props.theme, this.props.context.config);
        }
    }
    get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme, this.props.context.config);
        }
        else {
            return StyleManager.getInputBorderColor(this.props.theme, this.props.context.config);
        }
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
};
TimeInputView = __decorate([
    safe
], TimeInputView);
export { TimeInputView };
