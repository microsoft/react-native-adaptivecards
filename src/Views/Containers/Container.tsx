import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { ActionContext } from '../../Contexts/ActionContext';
import { ContainerElement } from '../../Schema/Containers/Container';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ContainerElement> {
}

export class ContainerView extends React.Component<IProps> {
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

        return (
            <Column
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                onPress={element.selectAction ? this.onPress : undefined}
                spacing={this.styleConfig.spacing}
            >
                {this.renderContents()}
            </Column>
        );
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
        console.log('ContainerView onPress');
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }
}
