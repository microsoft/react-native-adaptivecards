import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { DatePanel } from '../../Components/Inputs/DatePanel';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class DateInputView extends React.Component {
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
                this.tempValue = this.state.value;
            });
        };
        this.onSave = () => {
            this.setState({
                value: this.tempValue,
                focused: false,
            }, () => {
                const { model } = this.props;
                if (model) {
                    model.onInput(this.state.value);
                    let callback = model.context.blurHandler;
                    if (callback) {
                        callback();
                    }
                }
            });
        };
        this.onPress = () => {
            this.setState({
                focused: !this.state.focused,
            }, () => {
                const { model } = this.props;
                if (model) {
                    if (this.state.focused) {
                        let callback = model.context.focusHandler;
                        if (callback) {
                            callback();
                        }
                    }
                    else {
                        let callback = model.context.blurHandler;
                        if (callback) {
                            callback();
                        }
                    }
                }
            });
            console.log('DateInput onPress');
        };
        this.onStoreUpdate = (value) => {
            this.setState({
                value: value
            });
        };
        this.mounted = false;
        const { model } = this.props;
        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            this.state = {
                focused: false,
                value: model.value
            };
            model.onInput(this.state.value);
        }
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    setState(state, callback) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }
    render() {
        const { model, index, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        return ([
            React.createElement(Button, { key: 'DateInputButton' + index, title: this.state.value, color: this.color, backgroundColor: this.backgroundColor, borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, height: this.height, fontSize: this.fontSize, fontWeight: this.fontWeight, textHorizontalAlign: 'center', textVerticalAlign: 'center', marginTop: this.spacing, paddingLeft: this.paddingHorizontal, paddingRight: this.paddingHorizontal, paddingTop: this.paddingVertical, paddingBottom: this.paddingVertical, onPress: this.onPress }),
            React.createElement(DatePanel, { key: 'DatePanel' + index, value: this.state.value, show: this.state.focused, onValueChange: this.onValueChange, onSave: this.onSave, onCancel: this.onCancel })
        ]);
    }
    get fontSize() {
        return StyleManager.getFontSize('default');
    }
    get fontWeight() {
        return StyleManager.getFontWeight('default');
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
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
