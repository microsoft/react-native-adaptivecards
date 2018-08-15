import * as React from 'react';
import { NumberInput } from '../../Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';

interface IProps {
    index: number;
    element: NumberInputElement;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    focused: boolean;
}

export class NumberInputView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            let defaultValue = this.props.element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }

            if (NumberUtils.isNumber(this.props.element.value.toString())) {
                this.state = {
                    value: this.props.element.value.toString(),
                    focused: false,
                };
                this.updateStore();
            }
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <NumberInput
                color={StyleManager.getColor('default', this.theme, false)}
                backgroundColor={StyleManager.getBackgroundColor(this.theme)}
                borderColor={this.borderColor}
                borderRadius={4}
                borderWidth={1}
                fontSize={StyleManager.getFontSize('default')}
                fontWeight={StyleManager.getFontWeight('default')}
                placeholder={element.placeholder}
                value={this.state.value}
                onValueChange={this.onValueChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                validateInput={element.validate}
                marginTop={this.spacing}
                paddingLeft={12}
                paddingRight={12}
                paddingTop={12}
                paddingBottom={12}
            />
        );
    }

    private onBlur = () => {
        console.log('NumberInputView onBlur');
        this.setState({
            focused: false,
        }, () => {
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        });
    }

    private onFocus = () => {
        console.log('NumberInputView onFocus');
        this.setState({
            focused: true,
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

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.props.element.validate(this.state.value)
        );
    }

    private get borderColor() {
        if (this.state.focused) {
            return StyleManager.getColor('accent', this.theme, false);
        } else {
            return StyleManager.getBackgroundColor(this.theme);
        }
    }

    private get theme() {
        if (this.props.theme === 'emphasis') {
            return 'default';
        } else {
            return 'emphasis';
        }
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
