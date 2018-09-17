import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class NumberInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('NumberInputView onBlur');
            const { model } = this.props;
            if (model) {
                let callback = model.context.blurHandler;
                if (callback) {
                    callback();
                }
            }
        };
        this.onFocus = () => {
            console.log('NumberInputView onFocus');
            const { model } = this.props;
            if (model) {
                let callback = model.context.focusHandler;
                if (callback) {
                    callback();
                }
            }
        };
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, () => {
                this.props.model.onInput(this.state.value);
            });
        };
        this.onStoreUpdate = (value) => {
            this.setState({
                value: value
            });
        };
        const { model } = this.props;
        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            let defaultValue = model.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }
            if (NumberUtils.isNumber(model.value.toString())) {
                this.state = {
                    value: model.value.toString(),
                };
                this.props.model.onInput(this.state.value);
            }
        }
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    setState(state, callback) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(InputBox, { placeholder: model.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur, onFocus: this.onFocus, theme: theme, marginTop: this.spacing }));
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
