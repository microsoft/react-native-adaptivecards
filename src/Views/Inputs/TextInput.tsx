import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextInputElement> {
}

interface IState {
    value: string;
}

export class TextInputView extends React.Component<IProps, IState> {

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
            >
                <InputBox
                    vIndex={0}
                    hIndex={0}
                    placeholder={element.placeholder}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                    onBlur={this.onBlur}
                />
            </Row>
        );
    }

    private onBlur = () => {
        console.log('TextInputView onBlur');
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
