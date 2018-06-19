import React from 'react';
import { View, } from 'react-native';
import { ContentElementView } from '../Factories/ContentElementView';
export class ColumnSetView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderColumn = (column, index) => {
            return (React.createElement(ContentElementView, { key: 'column' + index, index: index, element: column }));
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
        const { element } = props;
        this.hasFixedWidthColumns = element.columns.some(item => item.isFixedWidth());
        this.isEqualDistribution = element.columns.every(item => item.isFixedWidth());
    }
    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid() || !element.hasColumns()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: this.isEqualDistribution ? 'space-between' : 'flex-start',
            }, onLayout: this.onLayout }, element.columns.map(this.renderColumn)));
    }
}
