import React from 'react';
import { View, } from 'react-native';
import { ColumnWidth } from '../../Schema/Base/Enums';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
export class ColumnView extends React.PureComponent {
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }
        return (React.createElement(CardElementWrapper, { cardElement: element, index: index, style: this.getViewStyle() },
            React.createElement(View, { style: { flex: 1 } }, element.items.map((cardElement, index) => React.createElement(CardElementView, { key: 'containerItems' + index, index: index, element: cardElement })))));
    }
    getViewStyle() {
        const { element, containerWidth } = this.props;
        if (element.isFixedWidth()) {
            if (element.width < 10) {
                return {
                    flex: element.width,
                };
            }
            else if (containerWidth) {
                return {
                    width: containerWidth * (element.width / 100),
                };
            }
            else {
                return;
            }
        }
        else {
            return {
                flex: element.width === ColumnWidth.Auto ? 0 : 1,
                alignSelf: element.width,
            };
        }
    }
}
