import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor(props) {
        super(props);
        this.widths = [];
        this.renderFacts = () => {
            const { model, theme } = this.props;
            if (!model || !model.facts || model.facts.length === 0) {
                return undefined;
            }
            return model.facts.map((fact, index) => (React.createElement(FactView, { key: index, model: fact, theme: theme, titleWidth: this.state.width, onTitleLayout: this.onTitleLayout })));
        };
        this.onTitleLayout = (event) => {
            let currWidth = event.nativeEvent.layout.width;
            this.widths.push(currWidth);
            if (this.widths.length > 0 && this.widths.length === this.factCount) {
                this.widths.sort();
                this.setState({
                    width: this.widths[this.widths.length - 1]
                });
            }
        };
        this.state = {
            width: 'auto',
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        this.factCount = model.facts.length;
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
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
