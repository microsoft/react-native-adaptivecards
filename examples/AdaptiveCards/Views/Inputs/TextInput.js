import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class TextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('TextInputView onBlur');
            const { model } = this.props;
            if (model) {
                let callback = model.context.blurHandler;
                if (callback) {
                    callback();
                }
            }
        };
        this.onFocus = () => {
            console.log('TextInputView onFocus');
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
            this.state = {
                value: defaultValue
            };
            this.props.model.onInput(this.state.value);
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
        return (React.createElement(InputBox, { numberOfLines: this.numberOfLine, placeholder: model.placeholder, value: this.state.value, onValueChange: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur, theme: theme, marginTop: this.spacing }));
    }
    get numberOfLine() {
        if (this.props.model.isMultiline) {
            return 4;
        }
        return 1;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return StyleManager.getSpacing('default');
    }
}
