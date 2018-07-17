import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
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
        const background = element.getBackgroundImageUrl();
        if (background) {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: this.styleConfig.spacing }, ContentFactory.createBackgroundImageView(this.renderColumns(), background)));
        }
        else {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: this.styleConfig.spacing }, this.renderColumns()));
        }
    }
}
