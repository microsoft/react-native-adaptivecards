import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { ActionContext } from '../../Contexts/ActionContext';
import { ColumnElement } from '../../Schema/Containers/Column';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ColumnElement> {
}

export class ColumnView extends React.Component<IProps> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        const background = element.getBackgroundImageUrl();
        console.log(background);
        if (background) {
            return (
                <Column
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    width={this.styleConfig.columnWidth}
                    onPress={element.selectAction ? this.onPress : undefined}
                    spacing={this.styleConfig.spacing}
                >
                    {ContentFactory.createBackgroundImageView(this.renderContents(), background)}
                </Column>
            );
        } else {
            return (
                <Column
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    width={this.styleConfig.columnWidth}
                    onPress={element.selectAction ? this.onPress : undefined}
                    spacing={this.styleConfig.spacing}
                >
                    {this.renderContents()}
                </Column>
            );
        }
    }

    private renderContents = () => {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return undefined;
        }

        if (element.hasItems()) {
            return element.items.map((content, index) => ContentFactory.createView(content, index));
        }
        return undefined;
    }

    private onPress = () => {
        console.log('ColumnView onPress');
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }
}
