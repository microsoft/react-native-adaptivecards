var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { CheckList } from '../../Components/Inputs/CheckList';
import { ChoicePanel } from '../../Components/Inputs/ChoicePanel';
import { RadioList } from '../../Components/Inputs/RadioList';
import { safe } from '../../Components/Shared/Safe';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/Number';
let ChoiceSetView = class ChoiceSetView extends React.Component {
    constructor(props) {
        super(props);
        this.onPanelClose = () => {
            this.setState({
                focused: !this.state.focused,
            }, () => {
                const { model, context } = this.props;
                if (model) {
                    if (this.state.focused) {
                        context.host.onFocus();
                    }
                    else {
                        context.host.onBlur();
                    }
                }
            });
        };
        this.onPanelButtonPress = () => {
            this.onPanelClose();
        };
        this.onChoose = (index) => {
            const { model, context } = this.props;
            if (model && model.choices) {
                if (NumberUtils.isInRange(index, 0, model.choices.length - 1)) {
                    model.choices[index].onSelect(index, context);
                }
                if (!model.isMultiSelect && this.state.focused) {
                    this.onPanelClose();
                }
            }
        };
        this.state = {
            focused: false,
        };
    }
    render() {
        const { model } = this.props;
        if (model.style === 'compact') {
            return this.renderChoicePanel();
        }
        else {
            if (model.isMultiSelect) {
                return this.renderCheckList();
            }
            else {
                return this.renderRadioList();
            }
        }
    }
    renderChoicePanel() {
        const { model, index, context } = this.props;
        return ([
            React.createElement(Button, { key: 'ChoiceSetInputButton' + index, title: this.title, color: this.color, backgroundColor: this.backgroundColor, borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, height: this.height, fontSize: this.fontSize, fontWeight: this.fontWeight, textHorizontalAlign: 'center', textVerticalAlign: 'center', marginTop: this.spacing, paddingLeft: this.paddingHorizontal, paddingRight: this.paddingHorizontal, paddingTop: this.paddingVertical, paddingBottom: this.paddingVertical, onPress: this.onPanelButtonPress }),
            React.createElement(ChoicePanel, { key: 'DatePanel' + index, choices: model.choices, config: context.config, show: this.state.focused, onChoose: this.onChoose, onClose: this.onPanelClose })
        ]);
    }
    renderCheckList() {
        const { model, context, theme } = this.props;
        return (React.createElement(CheckList, { choices: model.choices, config: context.config, theme: theme, onCheck: this.onChoose }));
    }
    renderRadioList() {
        const { model, context, theme } = this.props;
        return (React.createElement(RadioList, { choices: model.choices, config: context.config, theme: theme, onChoose: this.onChoose }));
    }
    get title() {
        const { model } = this.props;
        if (model && model.choices) {
            if (!model.isMultiSelect) {
                let choice = model.choices.find(current => current.selected);
                if (choice) {
                    return choice.title;
                }
            }
            else {
                return model.choices.reduce((prev, current) => {
                    if (current.selected) {
                        return `${prev}${(prev === '' ? '' : ',')}${current.title}`;
                    }
                    return prev;
                }, '');
            }
        }
        return '';
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
ChoiceSetView = __decorate([
    safe
], ChoiceSetView);
export { ChoiceSetView };
