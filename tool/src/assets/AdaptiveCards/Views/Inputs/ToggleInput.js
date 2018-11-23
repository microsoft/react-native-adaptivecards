import * as React from 'react';
import { Toggle } from '../../Components/Inputs/Toggle';
import { StyleManager } from '../../Styles/StyleManager';
export class ToggleInputView extends React.Component {
    constructor() {
        super(...arguments);
        this.onValueChange = (value) => {
            const { model, context } = this.props;
            if (model && model.onInput) {
                model.onInput(value, context);
            }
        };
    }
    render() {
        const { model, context, theme } = this.props;
        return (React.createElement(Toggle, { title: model.title, activated: model.value, config: context.config, theme: theme, marginTop: this.spacing, onValueChange: this.onValueChange }));
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
