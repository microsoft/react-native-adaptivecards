import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { ChoicePanel } from '../../Components/Inputs/ChoicePanel';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ChoiceSetView extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            const { model } = this.props;
            if (model) {
                this.setState({
                    focused: false,
                }, () => {
                    model.onInput(value);
                });
            }
        };
        this.onStoreUpdate = (value) => {
            console.log(value);
            this.setState({
                value: value,
                selected: this.props.model.parseSelected(),
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
        this.mounted = false;
        const { model } = this.props;
        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            this.state = {
                value: model.value,
                focused: false,
                selected: model.parseSelected(),
            };
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
            React.createElement(Button, { key: 'ChoiceSetInputButton' + index, title: this.state.value, color: this.color, backgroundColor: this.backgroundColor, borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, height: this.height, fontSize: this.fontSize, fontWeight: this.fontWeight, textHorizontalAlign: 'center', textVerticalAlign: 'center', marginTop: this.spacing, paddingLeft: this.paddingHorizontal, paddingRight: this.paddingHorizontal, paddingTop: this.paddingVertical, paddingBottom: this.paddingVertical, onPress: this.onPress }),
            React.createElement(ChoicePanel, { key: 'DatePanel' + index, choices: model.choices, selected: this.state.selected, show: this.state.focused, onChoose: this.onValueChange })
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
