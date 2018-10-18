import * as React from 'react';

import { InputBox } from '../../Components/Inputs/InputBox';
import { NumberInputNode } from '../../Models/Nodes/Inputs/NumberInput';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<NumberInputNode> {
}

export class NumberInputView extends React.Component<IProps> {
    public render() {
        const { model, context, theme } = this.props;

        return (
            <InputBox
                placeholder={model.placeholder}
                value={model.value}
                config={context.config}
                onValueChange={this.onValueChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private onBlur = () => {
        const { model, context } = this.props;

        if (model) {
            let callback = context.host.onBlur;
            if (callback) {
                callback();
            }
        }
    }

    private onFocus = () => {
        const { model, context } = this.props;

        if (model) {
            let callback = context.host.onFocus;
            if (callback) {
                callback();
            }
        }
    }

    private onValueChange = (value: string) => {
        this.props.model.onInput(value, this.props.context);
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
