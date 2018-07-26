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
            if (!element || !element.isValid || !element.columns || element.columns.length === 0) {
                return undefined;
            }
            return element.columns.map((column, index) => (React.createElement(ColumnView, { key: index, vIndex: 0, hIndex: index, element: column, theme: this.props.theme })));
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        const background = element.getBackgroundImageUrl();
        if (background) {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing) }, ContentFactory.createBackgroundImageView(this.renderColumns(), background)));
        }
        else {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing) }, this.renderColumns()));
        }
    }
}
