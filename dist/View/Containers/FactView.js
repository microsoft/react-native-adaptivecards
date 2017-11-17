import React from 'react';
import { View, } from 'react-native';
import styleManager from '../Style/styleManager';
import AdaptiveCardText from '../Shared/AdaptiveCardText';
export default class FactView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = styleManager.getStyle();
    }
    render() {
        const { fact } = this.props;
        if (!fact || !fact.isValid()) {
            return null;
        }
        return React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start'
            } },
            React.createElement(AdaptiveCardText, { style: {
                    color: this.styleConfig.fact.titleColor,
                    marginRight: this.styleConfig.fact.spacing,
                } }, fact.title),
            React.createElement(AdaptiveCardText, { style: {
                    color: this.styleConfig.fact.valueColor,
                    marginLeft: this.styleConfig.fact.spacing,
                } }, fact.value));
    }
}
