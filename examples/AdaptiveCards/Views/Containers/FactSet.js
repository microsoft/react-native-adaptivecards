import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderFacts = () => {
            const { model, theme } = this.props;
            if (!model || !model.facts || model.facts.length === 0) {
                return undefined;
            }
            return model.facts.map((fact, index) => (React.createElement(FactView, { key: index, model: fact, theme: theme })));
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(View, { style: {
                flexDirection: 'column',
                marginTop: this.spacing,
                alignSelf: 'stretch'
            } }, this.renderFacts()));
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return StyleManager.getSpacing('default');
    }
}
