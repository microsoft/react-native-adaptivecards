import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderFacts = () => {
            const { model, context, theme } = this.props;
            if (!model || !model.facts || model.facts.length === 0) {
                return undefined;
            }
            return model.facts.map((fact, index) => (React.createElement(FactView, { index: 0, key: index, model: fact, context: context, theme: theme })));
        };
    }
    render() {
        return (React.createElement(View, { style: {
                flexDirection: 'column',
                marginTop: this.spacing,
                alignSelf: 'stretch'
            } }, this.renderFacts()));
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
