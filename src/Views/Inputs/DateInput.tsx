import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { DatePanel } from '../../Components/Inputs/DatePanel';
import { safe } from '../../Components/Shared/Safe';
import { DateInputNode } from '../../Models/Nodes/Inputs/DateInput';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<DateInputNode> {
}

interface IState {
    focused: boolean;
}

@safe
export class DateInputView extends React.Component<IProps, IState> {
    private tempValue = '';

    constructor(props: IProps) {
        super(props);

        this.state = {
            focused: false,
        };
    }

    public render() {
        const { model, context, index } = this.props;

        return (
            [
                <Button
                    key={'DateInputButton' + index}
                    title={model.value}
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
                    onPress={this.onPress}
                />,
                <DatePanel
                    key={'DatePanel' + index}
                    value={model.value}
                    show={this.state.focused}
                    config={context.config}
                    onValueChange={this.onValueChange}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            ]
        );
    }

    private onValueChange = (value: string) => {
        this.tempValue = value;
    }

    private onCancel = () => {
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
    }

    private onSave = () => {
        this.setState({
            focused: false,
        }, () => {
            const { model, context } = this.props;

            if (model) {
                model.onInput(this.tempValue, context);

                context.host.onBlur();
            }
        });
    }

    private onPress = () => {
        const { model, context } = this.props;

        if (model) {
            this.tempValue = model.value;

            this.setState({
                focused: !this.state.focused,
            }, () => {
                if (this.state.focused) {
                    context.host.onFocus();
                } else {
                    context.host.onBlur();
                }
            });
        }
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
