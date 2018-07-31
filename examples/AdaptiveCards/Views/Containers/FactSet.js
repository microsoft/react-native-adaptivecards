import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { StyleManager } from '../../Styles/StyleManager';
import { FactView } from './Fact';
export class FactSetView extends React.Component {
    constructor(props) {
        super(props);
        this.renderFacts = () => {
            const { element } = this.props;
            if (!element || !element.isValid || !element.facts || element.facts.length === 0) {
                return undefined;
            }
            return element.facts.map((fact, index) => (React.createElement(FactView, { key: index, vIndex: 0, hIndex: index, element: fact, theme: this.props.theme })));
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', height: 'auto', vSPacing: StyleManager.getInstance().getSpacing(element.spacing) }, this.renderFacts()));
    }
}
