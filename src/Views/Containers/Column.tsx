import * as React from 'react';

import { ColumnNode } from '../../Models/Nodes/Containers/Column';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardProps/Background';
import { SelectActionView } from '../CardProps/SelectAction';
import { Factory as ViewFactory } from '../Factory';

interface IProps extends IViewProps<ColumnNode> {
}

export class ColumnView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { model, context, theme } = this.props;

        let backgroundColor = StyleManager.getBackgroundColor(model.style, context.config);

        return (
            <SelectActionView
                index={0}
                theme={theme}
                model={model.selectAction}
                context={context}
                
                style={{
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor,
                }}
            >
                {this.renderContent()}
            </SelectActionView>
        );
    }

    private renderContent = () => {
        const { model, context, theme, index } = this.props;

        if (!model) {
            return undefined;
        }

        const background = model.backgroundImage;

        if (background && background.url) {
            return (
                <BackgroundImageView
                    index={index}
                    theme={theme}
                    model={background}
                    context={context}
                    
                >
                    {this.renderItems()}
                </BackgroundImageView>
            );
        }
        return this.renderItems();
    }

    private renderItems = () => {
        const { model, context } = this.props;

        if (!model) {
            return undefined;
        }

        if (model.items) {
            // tslint:disable-next-line:max-line-length
            return model.items.map((content, index) => ViewFactory.createView(content, context, index, model.style || this.props.theme));
        }
        return undefined;
    }

    private get justifyContent() {
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

    private get alignSelf() {
        const { model } = this.props;

        if (!model) {
            return 'flex-start';
        }
        if (model.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }

    private get flex() {
        const { model } = this.props;

        if (!model || model.width === 'auto') {
            return 0;
        }
        if (model.width === undefined || model.width === 'stretch') {
            return 1;
        }
        return model.width;
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
