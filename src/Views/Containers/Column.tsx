import * as React from 'react';
import { Column } from '../../Abandon/Components/Containers/Column';
import { ActionContext } from '../../Contexts/ActionContext';
import { ColumnElement } from '../../Schema/Containers/Column';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ColumnElement> {
    theme?: 'default' | 'emphasis';
}

export class ColumnView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        const background = element.getBackgroundImageUrl();

        if (background) {
            return (
                <Column
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    width={StyleManager.getInstance().getColumnWidth(element)}
                    height={element.height}
                    onPress={element.selectAction ? this.onPress : undefined}
                    hSpacing={StyleManager.getInstance().getSpacing(element.spacing)}
                    style={[this.minWidth, this.minHeight]}
                >
                    {ContentFactory.createBackgroundImageView(this.renderContents(), background)}
                </Column>
            );
        } else {
            return (
                <Column
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    width={StyleManager.getInstance().getColumnWidth(element)}
                    height={element.height}
                    hSpacing={StyleManager.getInstance().getSpacing(element.spacing)}
                    style={this.minWidth}
                >
                    {this.renderContents()}
                </Column>
            );
        }
    }

    private renderContents = () => {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        if (element.items) {
            return element.items.map((content, index) => ContentFactory.createView(content, index, this.props.theme));
        }
        return undefined;
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }

    private get minWidth() {
        const { element } = this.props;

        if (!element || !element.isValid || !element.items || element.items.length === 0) {
            return { minWidth: 3 };
        } else {
            return {};
        }
    }

    private get minHeight() {
        const { element } = this.props;

        if (element && element.isValid && element.backgroundImage) {
            return { minHeight: 150 };
        } else {
            return {};
        }
    }
}
