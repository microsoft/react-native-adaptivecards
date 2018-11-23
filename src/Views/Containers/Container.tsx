import * as React from 'react';

import { ContainerNode } from '../../Models/Nodes/Containers/Container';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardProps/Background';
import { SelectActionView } from '../CardProps/SelectAction';
import { Factory as ViewFactory } from '../Factory';

interface IProps extends IViewProps<ContainerNode> {
}

export class ContainerView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            disabled: false,
        };
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
                    alignSelf: 'stretch',
                    justifyContent: this.justifyContent,
                    marginTop: this.spacing,
                    backgroundColor: backgroundColor,
                }}
            >
                {this.renderContent()}
            </SelectActionView>
        );
    }

    private renderContent = () => {
        const { model, context, theme } = this.props;

        if (!model) {
            return undefined;
        }

        const background = model.backgroundImage;

        if (background && background.url) {
            return (
                <BackgroundImageView
                    index={0}
                    model={background}
                    context={context}
                    theme={theme}
                    
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

    private get flex() {
        const { model } = this.props;

        if (!model) {
            return 0;
        }

        if (model.height === 'stretch') {
            return 1;
        }

        return 0;
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
