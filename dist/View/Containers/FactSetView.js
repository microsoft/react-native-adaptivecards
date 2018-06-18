import React from 'react';
import { View } from 'react-native';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { FactView } from './FactView';
export class FactSetView extends React.PureComponent {
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid() || !element.hasFacts()) {
            return null;
        }
        return (React.createElement(DecCardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                } }, element.facts.map((fact, index) => React.createElement(FactView, { key: 'fact' + index, element: fact })))));
    }
}
