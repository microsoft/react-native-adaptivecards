import * as React from 'react';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardProps/Background';
import { SelectActionView } from '../CardProps/SelectAction';
import { Factory as ViewFactory } from '../Factory';
export class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = () => {
            const { model, context, theme, index } = this.props;
            if (!model) {
                return undefined;
            }
            const background = model.backgroundImage;
            if (background && background.url) {
                return (React.createElement(BackgroundImageView, { index: index, theme: theme, model: background, context: context }, this.renderItems()));
            }
            return this.renderItems();
        };
        this.renderItems = () => {
            const { model, context } = this.props;
            if (!model) {
                return undefined;
            }
            if (model.items) {
                return model.items.map((content, index) => ViewFactory.createView(content, context, index, model.style || this.props.theme));
            }
            return undefined;
        };
    }
    render() {
        const { model, context, theme } = this.props;
        let backgroundColor = StyleManager.getBackgroundColor(model.style, context.config);
        return (React.createElement(SelectActionView, { index: 0, theme: theme, model: model.selectAction, context: context, style: {
                flex: this.flex,
                flexDirection: 'column',
                alignSelf: this.alignSelf,
                justifyContent: this.justifyContent,
                marginLeft: this.spacing,
                backgroundColor: backgroundColor,
            } }, this.renderContent()));
    }
    get justifyContent() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        switch (model.verticalContentAlignment) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    }
    get alignSelf() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        if (model.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }
    get flex() {
        const { model } = this.props;
        if (!model || model.width === 'auto') {
            return 0;
        }
        if (model.width === undefined || model.width === 'stretch') {
            return 1;
        }
        return model.width;
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
