import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextInputElement> {
}

interface IState {
    value: string;
}

export class TextInputView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;

        if (element && element.isValid()) {
            this.state = {
                value: this.props.element.value,
            };
            this.updateStore();
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
            this.props.element.validateForm(this.state.value)
        );
    }
}
