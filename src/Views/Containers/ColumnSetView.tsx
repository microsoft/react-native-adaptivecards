import React from 'react';
import {
    LayoutChangeEvent,
    View,
} from 'react-native';

import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContentElementView } from '../Factories/ContentElementView';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ColumnSetElement> {
}

interface IState {
    viewWidth: number;
}

export class ColumnSetView extends React.PureComponent<IProps, IState> {
    private isComponentUnmounted: Boolean;
    private hasFixedWidthColumns: Boolean;
    private isEqualDistribution: Boolean;

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

    public componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid() || !element.hasColumns()) {
            return null;
        }

        return (
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
        );
    }

    private renderColumn = (column: ColumnElement, index: number) => {
        return (
            <ContentElementView
                key={'column' + index}
                index={index}
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
