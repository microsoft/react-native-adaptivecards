import * as React from 'react';
import { Toggle } from '../../Components/Inputs/Toggle';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ToggleInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = (value) => {
            const { model } = this.props;
            if (model && model.isSchemaCheckPassed) {
                if (this.state.checked) {
                    model.onInput(model.valueOff);
                }
                else {
                    model.onInput(model.valueOn);
                }
            }
        };
        this.onStoreUpdate = (value) => {
            this.setState({
                checked: value === this.props.model.valueOn
            });
        };
        const { model } = this.props;
        if (model && model.isSchemaCheckPassed) {
            this.state = {
                checked: model.value === model.valueOn,
            };
            model.onStoreUpdate = this.onStoreUpdate;
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
        return (React.createElement(Toggle, { title: model.title, value: model.value, checked: this.state.checked, theme: theme, marginTop: this.spacing, onClick: this.onClick }));
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
