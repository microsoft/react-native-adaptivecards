import * as React from 'react';
import { StyleManager } from '../../Styles/StyleManager';
import { SelectActionView } from '../CardProps/SelectAction';
import { ColumnView } from './Column';
export class ColumnSetView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = () => {
            const { model } = this.props;
            if (!model) {
                return undefined;
            }
            return this.renderColumns();
        };
        this.renderColumns = () => {
            const { model, context } = this.props;
            if (!model || !model.columns || model.columns.length === 0) {
                return undefined;
            }
            return model.columns.map((column, index) => (React.createElement(ColumnView, { key: index, index: index, model: column, context: context, theme: this.props.theme })));
        };
        this.state = {
            disabled: false,
        };
    }
    render() {
        const { model, context, theme } = this.props;
        return (React.createElement(SelectActionView, { index: 0, theme: theme, model: model.selectAction, context: context, style: {
                flex: this.flex,
                flexDirection: 'row',
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                marginTop: this.spacing,
            } }, this.renderContent()));
    }
    get flex() {
        const { model } = this.props;
        if (!model) {
            return 0;
        }
        if (model.height === 'stretch') {
            return 1;
        }
        return 0;
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
