import * as React from 'react';
import { Row } from '../../Components/Containers/Row';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';
import { ColumnView } from './Column';

interface IProps extends IElementViewProps<ColumnSetElement> {
}

export class ColumnSetView extends React.Component<IProps> {
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
                <Row
                    vIndex={this.props.vIndex}
                    hIndex={this.props.hIndex}
                    spacing={StyleManager.getInstance().getSpacing(element.spacing)}
                    width='stretch'
                    height='auto'
                >
                    {ContentFactory.createBackgroundImageView(this.renderColumns(), background)}
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
                >
                    {this.renderColumns()}
                </Row>
            );
        }
    }

    private renderColumns = () => {
        const { element } = this.props;

        if (!element || !element.isValid || !element.columns || element.columns.length === 0) {
            return undefined;
        }

        return element.columns.map((column, index) => (
            <ColumnView
                key={index}
                vIndex={0}
                hIndex={index}
                element={column}
                theme={this.props.theme}
            />
        ));
    }
}
