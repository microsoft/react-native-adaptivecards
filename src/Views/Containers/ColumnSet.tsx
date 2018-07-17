import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';
import { ColumnView } from './Column';

interface IProps extends IElementViewProps<ColumnSetElement> {
}

export class ColumnSetView extends React.Component<IProps> {
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

        if (background) {
            return (
                <Row
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    spacing={this.styleConfig.spacing}
                >
                    {ContentFactory.createBackgroundImageView(this.renderColumns(), background)}
                </Row>
            );
        } else {
            return (
                <Row
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    spacing={this.styleConfig.spacing}
                >
                    {this.renderColumns()}
                </Row>
            );
        }
    }

    private renderColumns = () => {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return undefined;
        }

        if (element.hasColumns()) {
            return element.columns.map((column, index) => (
                <ColumnView
                    key={index}
                    vIndex={0}
                    hIndex={index}
                    element={column}
                />
            ));
        }
    }
}
