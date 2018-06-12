import React from 'react';
import { View, } from 'react-native';
import { ColumnWidth, } from '../../Schema/enums';
import { CardElementView } from '../Elements/CardElementView';
import { CardElementWrapper } from '../Shared/CardElementWrapper';
export class ColumnView extends React.PureComponent {
    render() {
        const { column, index } = this.props;
        if (!column || !column.isValid() || !column.hasItems()) {
            return null;
        }
        return (React.createElement(CardElementWrapper, { cardElement: column, index: index, style: this.getViewStyle() },
            React.createElement(View, { style: { flex: 1 } }, column.items.map((cardElement, index) => React.createElement(CardElementView, { key: 'containerItems' + index, index: index, cardElement: cardElement })))));
    }
    getViewStyle() {
        const { column, containerWidth } = this.props;
        if (column.isFixedWidth()) {
            if (column.width < 10) {
                return {
                    flex: column.width,
                };
            }
            else if (containerWidth) {
                return {
                    width: containerWidth * (column.width / 100),
                };
            }
            else {
                return;
            }
        }
        else {
            return {
                flex: column.width === ColumnWidth.Auto ? 0 : 1,
                alignSelf: column.width,
            };
        }
    }
}
