import React from 'react';
import { View, } from 'react-native';
import CardElementWrapper from '../Shared/CardElementWrapper';
import FactView from './FactView';
export default class FactSetView extends React.PureComponent {
    render() {
        const { factSet, index } = this.props;
        if (!factSet || !factSet.isValid() || !factSet.hasFacts()) {
            return null;
        }
        return React.createElement(CardElementWrapper, { cardElement: factSet, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                } }, factSet.facts.map((fact, index) => React.createElement(FactView, { key: 'fact' + index, fact: fact }))));
    }
}
