import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    index: number;
    element: TextInputElement;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    focused: boolean;
}

export class TextInputView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            this.state = {
                value: this.props.element.value,
                focused: false,
            };
            this.updateStore();
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <InputBox
                color={this.color}
                backgroundColor={this.backgroundColor}
                borderColor={this.borderColor}
                borderRadius={4}
                borderWidth={1}
                height={this.height}
                numberOfLines={this.numberOfLine}
                fontSize={this.fontSize}
                fontWeight={this.fontWeight}
                placeholder={element.placeholder}
                value={this.state.value}
                onValueChange={this.onValueChange}
                validateInput={this.validateInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                marginTop={this.spacing}
                paddingLeft={this.paddingHorizontal}
                paddingRight={this.paddingHorizontal}
                paddingTop={this.paddingVertical}
                paddingBottom={this.paddingVertical}
            />
        );
    }

    private onBlur = () => {
        console.log('TextInputView onBlur');
        this.setState({
            focused: false
        }, () => {
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        });
    }

    private onFocus = () => {
        console.log('TextInputView onFocus');
        this.setState({
            focused: true
        }, () => {
            let callback = HostContext.getInstance().getHandler('focus');
            if (callback) {
                callback();
            }
        });
    }

    private onValueChange = (value: string) => {
        this.setState({
            value: value
        }, this.updateStore);
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
        if (this.props.element.isMultiline) {
            return 4;
        }
        return 1;
    }

    private get height() {
        return this.fontSize * this.numberOfLine + this.paddingVertical * 2;
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
