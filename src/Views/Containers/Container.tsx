import * as React from 'react';
import { Column } from '../../Abandon/Components/Containers/Column';
import { Row } from '../../Abandon/Components/Containers/Row';
import { ActionContext } from '../../Contexts/ActionContext';
import { ContainerElement } from '../../Schema/Containers/Container';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ContainerElement> {
}

export class ContainerView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        const background = element.getBackgroundImageUrl();

        let backgroundColor = StyleManager.getInstance().getBackgroundColor(element.style);

        if (background) {
            return (
                <Row
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    spacing={StyleManager.getInstance().getSpacing(element.spacing)}
                    width='stretch'
                    height='auto'
                    onPress={element.selectAction ? this.onPress : undefined}
                    style={[
                        {
                            backgroundColor: backgroundColor,
                        },
                        this.minHeight
                    ]}
                >
                    <Column
                        vIndex={0}
                        hIndex={0}
                        width='stretch'
                        height='auto'
                        vSpacing={0}
                    >
                        {ContentFactory.createBackgroundImageView(this.renderContents(), background)}
                    </Column>
                </Row>
            );
        } else {
            return (
                <Row
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    spacing={StyleManager.getInstance().getSpacing(element.spacing)}
                    width='stretch'
                    height='auto'
                    onPress={element.selectAction ? this.onPress : undefined}
                    style={[
                        {
                            backgroundColor: backgroundColor,
                        },
                        this.minHeight
                    ]}
                >
                    <Column
                        vIndex={0}
                        hIndex={0}
                        width='stretch'
                        height='auto'
                        vSpacing={0}
                    >
                        {this.renderContents()}
                    </Column>
                </Row>
            );
        }
    }

    private renderContents = () => {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        if (element.items) {
            return element.items.map((content, index) => ContentFactory.createView(content, index, element.style || this.props.theme));
        }
        return undefined;
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
        if (callback) {
            callback();
        }
    }

    private get minHeight() {
        const { element } = this.props;

        if (!element || !element.isValid || !element.items || element.items.length === 0) {
            return { minHeight: 3 };
        } else {
            return {};
        }
    }
}
