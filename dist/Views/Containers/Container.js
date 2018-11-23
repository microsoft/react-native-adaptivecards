import * as React from 'react';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardProps/Background';
import { SelectActionView } from '../CardProps/SelectAction';
import { Factory as ViewFactory } from '../Factory';
export class ContainerView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = () => {
            const { model, context, theme } = this.props;
            if (!model) {
                return undefined;
            }
            const background = model.backgroundImage;
            if (background && background.url) {
                return (React.createElement(BackgroundImageView, { index: 0, model: background, context: context, theme: theme }, this.renderItems()));
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
        this.state = {
            disabled: false,
        };
    }
    render() {
        const { model, context, theme } = this.props;
        let backgroundColor = StyleManager.getBackgroundColor(model.style, context.config);
        return (React.createElement(SelectActionView, { index: 0, theme: theme, model: model.selectAction, context: context, style: {
                flex: this.flex,
                alignSelf: 'stretch',
                justifyContent: this.justifyContent,
                marginTop: this.spacing,
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
