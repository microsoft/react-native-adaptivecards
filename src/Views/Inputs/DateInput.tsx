import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { DateInput } from '../../Components/Inputs/DateInput';
import { FormContext } from '../../Contexts/FormContext';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<DateInputElement> {
}

interface IState {
    value: string;
}

export class DateInputView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid()) {
            this.state = {
                value: this.props.element.value,
            };
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
                <DateInput
                    vIndex={0}
                    hIndex={0}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    validateInput={element.validateForm}
                />
            </Row>
        );
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
