import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: TextInputElement;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
}

export class TextInputView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            let defaultValue = element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }

            this.state = {
                value: defaultValue
            };
            this.updateStore();
        }
    }

    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }

        return (
            <InputBox
                numberOfLines={this.numberOfLine}
                placeholder={element.placeholder}
                value={this.state.value}
                onValueChange={this.onValueChange}
                validateInput={this.validateInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private onBlur = () => {
        console.log('TextInputView onBlur');

        let callback = HostContext.getInstance().getHandler('blur');
        if (callback) {
            callback();
        }
    }

    private onFocus = () => {
        console.log('TextInputView onFocus');

        let callback = HostContext.getInstance().getHandler('focus');
        if (callback) {
            callback();
        }
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

    private get numberOfLine() {
        if (this.props.element.isMultiline) {
            return 4;
        }
        return 1;
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
