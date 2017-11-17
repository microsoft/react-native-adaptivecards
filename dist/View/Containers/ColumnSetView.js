import React from 'react';
import { View, } from 'react-native';
import CardElementWrapper from '../Shared/CardElementWrapper';
import CardElementView from '../Elements/CardElementView';
export default class ColumnSetView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderColumn = (column, index) => {
            return React.createElement(CardElementView, { key: 'column' + index, index: index, containerWidth: this.state.viewWidth, cardElement: column });
        };
        this.onLayout = (event) => {
            if (!this.isComponentUnmounted && !this.state.viewWidth && this.hasFixedWidthColumns) {
                this.setState({
                    viewWidth: event.nativeEvent.layout.width,
                });
            }
        };
        this.state = {
            viewWidth: 0,
        };
        const { columnSet } = props;
        this.hasFixedWidthColumns = columnSet.columns.some(item => item.isFixedWidth());
        this.isEqualDistribution = columnSet.columns.every(item => item.isFixedWidth());
    }
    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }
    render() {
        const { columnSet, index } = this.props;
        if (!columnSet || !columnSet.isValid() || !columnSet.hasColumns()) {
            return null;
        }
        return React.createElement(CardElementWrapper, { cardElement: columnSet, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: this.isEqualDistribution ? 'space-between' : 'flex-start',
                }, onLayout: this.onLayout }, columnSet.columns.map(this.renderColumn)));
    }
}
ColumnSetView.defaultProps = {
    isComponentUnmounted: false,
    hasFixedWidthColumns: false,
    isEqualDistribution: true,
};
