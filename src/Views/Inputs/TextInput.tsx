import * as React from 'react';

import { InputBox } from '../../Components/Inputs/InputBox';
import { TextInputNode } from '../../Models/Nodes/Inputs/TextInput';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<TextInputNode> {
}

export class TextInputView extends React.Component<IProps> {
    public render() {
        const { model, context, theme } = this.props;

        return (
            <InputBox
                numberOfLines={this.numberOfLine}
                placeholder={model.placeholder}
                value={model.value}
                config={context.config}
                onValueChange={this.onValueChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private onBlur = () => {
        const { model, context } = this.props;

        if (model && context) {
            let callback = context.host.onBlur;
            if (callback) {
                callback();
            }
        }
    }

    private onFocus = () => {
        const { model, context } = this.props;

        if (model && context) {
            let callback = context.host.onFocus;
            if (callback) {
                callback();
            }
        }
    }

    private onValueChange = (value: string) => {
        this.props.model.onInput(value, this.props.context);
    }

    private get numberOfLine() {
        if (this.props.model.isMultiline) {
            return 4;
        }
        return 1;
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
