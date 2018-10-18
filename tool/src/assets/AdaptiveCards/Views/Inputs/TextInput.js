import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { StyleManager } from '../../Styles/StyleManager';
export class TextInputView extends React.Component {
    constructor() {
        super(...arguments);
        this.onBlur = () => {
            const { model, context } = this.props;
            if (model && context) {
                let callback = context.host.onBlur;
                if (callback) {
                    callback();
                }
            }
        };
        this.onFocus = () => {
            const { model, context } = this.props;
            if (model && context) {
                let callback = context.host.onFocus;
                if (callback) {
                    callback();
                }
            }
        };
        this.onValueChange = (value) => {
            this.props.model.onInput(value, this.props.context);
        };
    }
    render() {
        const { model, context, theme } = this.props;
        return (React.createElement(InputBox, { numberOfLines: this.numberOfLine, placeholder: model.placeholder, value: model.value, config: context.config, onValueChange: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur, theme: theme, marginTop: this.spacing }));
    }
    get numberOfLine() {
        if (this.props.model.isMultiline) {
            return 4;
        }
        return 1;
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
