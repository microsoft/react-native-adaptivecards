import * as React from 'react';
import { Toggle } from '../../Components/Inputs/Toggle';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ToggleInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = (index) => {
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
        return (React.createElement(Toggle, { index: 0, title: model.title, checked: this.state.checked, theme: theme, onClick: this.onClick }));
    }
}
