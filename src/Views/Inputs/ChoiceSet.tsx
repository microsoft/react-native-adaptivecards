import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { CheckList } from '../../Components/Inputs/CheckList';
import { ChoicePanel } from '../../Components/Inputs/ChoicePanel';
import { RadioList } from '../../Components/Inputs/RadioList';
import { safe } from '../../Components/Shared/Safe';
import { ChoiceSetNode } from '../../Models/Nodes/Inputs/ChoiceSet';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/Number';

interface IProps extends IViewProps<ChoiceSetNode> {
}

interface IState {
    focused: boolean;
}

@safe
export class ChoiceSetView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            focused: false,
        };
    }

    public render() {
        const { model } = this.props;

        if (model.style === 'compact') {
            return this.renderChoicePanel();
        } else {
            if (model.isMultiSelect) {
                return this.renderCheckList();
            } else {
                return this.renderRadioList();
            }
        }
    }

    private renderChoicePanel() {
        const { model, index, context } = this.props;

        return (
            [
                <Button
                    key={'ChoiceSetInputButton' + index}
                    title={this.title}
                    color={this.color}
                    backgroundColor={this.backgroundColor}
                    borderColor={this.borderColor}
                    borderRadius={4}
                    borderWidth={1}
                    height={this.height}
                    fontSize={this.fontSize}
                    fontWeight={this.fontWeight}
                    textHorizontalAlign='center'
                    textVerticalAlign='center'
                    marginTop={this.spacing}
                    paddingLeft={this.paddingHorizontal}
                    paddingRight={this.paddingHorizontal}
                    paddingTop={this.paddingVertical}
                    paddingBottom={this.paddingVertical}
                    onPress={this.onPanelButtonPress}
                />,
                <ChoicePanel
                    key={'DatePanel' + index}
                    choices={model.choices}
                    config={context.config}
                    show={this.state.focused}
                    onChoose={this.onChoose}
                    onClose={this.onPanelClose}
                />
            ]
        );
    }

    private renderCheckList() {
        const { model, context, theme } = this.props;

        return (
            <CheckList
                choices={model.choices}
                config={context.config}
                theme={theme}
                onCheck={this.onChoose}
            />
        );
    }

    private renderRadioList() {
        const { model, context, theme } = this.props;

        return (
            <RadioList
                choices={model.choices}
                config={context.config}
                theme={theme}
                onChoose={this.onChoose}
            />
        );
    }

    private onPanelClose = () => {
        this.setState({
            focused: !this.state.focused,
        }, () => {
            const { model, context } = this.props;

            if (model) {
                if (this.state.focused) {
                    context.host.onFocus();
                } else {
                    context.host.onBlur();
                }
            }
        });
    }

    private onPanelButtonPress = () => {
        this.onPanelClose();
    }

    private onChoose = (index: number) => {
        const { model, context } = this.props;

        if (model && model.choices) {
            if (NumberUtils.isInRange(index, 0, model.choices.length - 1)) {
                model.choices[index].onSelect(index, context);
            }

            if (!model.isMultiSelect && this.state.focused) {
                this.onPanelClose();
            }
        }
    }

    private get title() {
        const { model } = this.props;

        if (model && model.choices) {
            if (!model.isMultiSelect) {
                let choice = model.choices.find(current => current.selected);
                if (choice) {
                    return choice.title;
                }
            } else {
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

    private get fontSize() {
        return StyleManager.getFontSize('default', this.props.context.config);
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default', this.props.context.config);
    }

    private get paddingVertical() {
        return 12;
    }

    private get paddingHorizontal() {
        return 12;
    }

    private get numberOfLine() {
        return 1;
    }

    private get height() {
        return this.fontSize * this.numberOfLine + this.paddingVertical * 2 + 2;
    }

    private get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme, this.props.context.config);
        } else {
            return StyleManager.getInputColor(this.props.theme, this.props.context.config);
        }
    }

    private get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme, this.props.context.config);
        } else {
            return StyleManager.getInputBackgroundColor(this.props.theme, this.props.context.config);
        }
    }

    private get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme, this.props.context.config);
        } else {
            return StyleManager.getInputBorderColor(this.props.theme, this.props.context.config);
        }
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
