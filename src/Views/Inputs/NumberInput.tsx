import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { NumberInput } from '../../Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { NumberUtils } from '../../Shared/Utils';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<NumberInputElement> {
}

interface IState {
    value: string;
}

export class NumberInputView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid()) {
            let defaultValue = this.props.element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }

            if (NumberUtils.isNumber(this.props.element.value.toString())) {
                this.state = {
                    value: this.props.element.value.toString(),
                };
            }

            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                spacing={this.styleConfig.spacing}
            >
                <NumberInput
                    vIndex={0}
                    hIndex={0}
                    placeholder={element.placeholder}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    onBlur={this.onBlur}
                    validateInput={element.validateForm}
                />
            </Row>
        );
    }

    private onBlur = () => {
        console.log('NumberInputView onBlur');
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
            this.props.element.validateForm(this.state.value)
        );
    }
}
