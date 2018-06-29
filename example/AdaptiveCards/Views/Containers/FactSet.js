import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { StyleManager } from '../../Styles/StyleManager';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor(props) {
        super(props);
        this.renderFacts = () => {
            const { element } = this.props;
            if (!element || !element.isValue()) {
                return undefined;
            }
            if (element.facts) {
                return element.facts.map((fact, index) => (React.createElement(FactView, { key: index, vIndex: 0, hIndex: index, element: fact })));
            }
        };
        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', spacing: this.styleConfig.spacing }, this.renderFacts()));
    }
}
