import React from 'react';
import { View } from 'react-native';
import { FactView } from './FactView';
export class FactSetView extends React.PureComponent {
    render() {
        const { element } = this.props;
        if (!element || !element.isValid() || !element.hasFacts()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
            } }, element.facts.map((fact, index) => React.createElement(FactView, { key: 'fact' + index, element: fact, index: index }))));
    }
}
