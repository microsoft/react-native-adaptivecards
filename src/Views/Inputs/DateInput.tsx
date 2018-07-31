import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { DateInput } from '../../Components/Inputs/DateInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<DateInputElement> {
}

interface IState {
    value: string;
}

export class DateInputView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid) {
            this.state = {
                value: this.props.element.value,
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
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                spacing={StyleManager.getInstance().getSpacing(element.spacing)}
                width='stretch'
                height='auto'
            >
                <DateInput
                    vIndex={0}
                    hIndex={0}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    validateInput={element.validate}
                />
            </Row>
        );
    }

    private onBlur = () => {
        console.log('DateInputView onBlur');
        let callback = HostContext.getInstance().getHandler('blur');
        if (callback) {
            callback();
        }
    }

    private onFocus = () => {
        console.log('DateInputView onFocus');
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
