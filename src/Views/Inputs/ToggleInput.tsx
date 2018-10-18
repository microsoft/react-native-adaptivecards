import * as React from 'react';

import { Toggle } from '../../Components/Inputs/Toggle';
import { ToggleInputNode } from '../../Models/Nodes/Inputs/ToggleInput';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<ToggleInputNode> {
}

export class ToggleInputView extends React.Component<IProps> {
    public render() {
        const { model, context, theme } = this.props;

        return (
            <Toggle
                title={model.title}
                activated={model.value}
                config={context.config}
                theme={theme}
                marginTop={this.spacing}
                onValueChange={this.onValueChange}
            />
        );
    }

    private onValueChange = (value: boolean) => {
        const { model, context } = this.props;

        if (model && model.onInput) {
            model.onInput(value, context);
        }
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
