import * as React from 'react';
import { Row } from '../../Abandon/Components/Containers/Row';
import { NumberInput } from '../../Abandon/Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<NumberInputElement> {
}

interface IState {
    value: string;
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
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                spacing={StyleManager.getInstance().getSpacing(element.spacing)}
                width='stretch'
                height='auto'
            >
                <NumberInput
                    vIndex={0}
                    hIndex={0}
                    placeholder={element.placeholder}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    validateInput={element.validate}
                />
            </Row>
        );
    }

    private onBlur = () => {
        console.log('NumberInputView onBlur');
        let callback = HostContext.getInstance().getHandler('blur');
        if (callback) {
            callback();
        }
    }

    private onFocus = () => {
        console.log('NumberInputView onFocus');
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

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.value,
            this.props.element.validate(this.state.value)
        );
    }
}
