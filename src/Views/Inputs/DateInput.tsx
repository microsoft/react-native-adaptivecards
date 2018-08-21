import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { DatePanel } from '../../Components/Inputs/DatePanel';
import { FormContext } from '../../Contexts/FormContext';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: DateInputElement;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    focused: boolean;
}

export class DateInputView extends React.Component<IProps, IState> {
    private tempValue = '';
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            this.state = {
                focused: false,
                value: element.value
            };
        }
    }

    public render() {
        const { element, index, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }

        return (
            [
                <Button
                    key={'DateInputButton' + index}
                    title={this.state.value}
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
                    value={this.state.value}
                    show={this.state.focused}
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
            this.tempValue = this.state.value;
        });
    }

    private onSave = () => {
        this.setState({
            value: this.tempValue,
            focused: false,
        }, () => {
            this.updateStore();
        });
    }

    private validateInput = (input: string) => {
        if (this.props.element) {
            return this.props.element.validate(input);
        }
        return true;
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.validateInput(this.state.value)
        );
    }

    private onPress = () => {
        this.setState({
            focused: !this.state.focused,
        });
        console.log('on press');
    }

    private get fontSize() {
        return StyleManager.getFontSize('default');
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default');
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

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
