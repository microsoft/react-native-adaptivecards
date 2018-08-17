import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderFacts = () => {
            const { element, theme } = this.props;
            if (!element || !element.isValid || !element.facts || element.facts.length === 0) {
                return undefined;
            }
            return element.facts.map((fact, index) => (React.createElement(FactView, { key: index, element: fact, theme: theme })));
        };
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(View, { flexDirection: 'column', marginTop: this.spacing, alignSelf: 'stretch' }, this.renderFacts()));
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
