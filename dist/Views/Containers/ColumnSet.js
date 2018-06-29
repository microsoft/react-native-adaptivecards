import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { StyleManager } from '../../Styles/StyleManager';
import { ColumnView } from './Column';
export class ColumnSetView extends React.Component {
    constructor(props) {
        super(props);
        this.renderColumns = () => {
            const { element } = this.props;
            if (!element || !element.isValid()) {
                return undefined;
            }
            if (element.hasColumns()) {
                return element.columns.map((column, index) => (React.createElement(ColumnView, { key: index, vIndex: 0, hIndex: index, element: column })));
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
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: this.styleConfig.spacing }, this.renderColumns()));
    }
}
