import React from 'react';
import {
    LayoutChangeEvent,
    View,
} from 'react-native';

import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<ColumnSetElement> {
}

interface IState {
    viewWidth: number;
}

export class ColumnSetView extends React.PureComponent<IProps, IState> {
    private isComponentUnmounted: Boolean;
    private hasFixedWidthColumns: Boolean;
    private isEqualDistribution: Boolean;

    static defaultProps = {
        isComponentUnmounted: false,
        hasFixedWidthColumns: false,
        isEqualDistribution: true,
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            viewWidth: 0,
        };

        const { element } = props;

        this.hasFixedWidthColumns = element.columns.some(item =>
            item.isFixedWidth()
        );
        this.isEqualDistribution = element.columns.every(item =>
            item.isFixedWidth()
        );
    }

    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasColumns()) {
            return null;
        }

        return (
            <CardElementWrapper
                cardElement={element}
                index={index}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: this.isEqualDistribution ? 'space-between' : 'flex-start',
                    }}
                    onLayout={this.onLayout}
                >
                    {
                        element.columns.map(this.renderColumn)
                    }
                </View>
            </CardElementWrapper>
        );
    }

    private renderColumn = (column: ColumnElement, index: number) => {
        return (
            <CardElementView
                key={'column' + index}
                index={index}
                containerWidth={this.state.viewWidth}
                element={column}
            />
        );
    }

    private onLayout = (event?: LayoutChangeEvent) => {
        if (!this.isComponentUnmounted && !this.state.viewWidth && this.hasFixedWidthColumns) {
            this.setState({
                viewWidth: event.nativeEvent.layout.width,
            });
        }
    }
}
