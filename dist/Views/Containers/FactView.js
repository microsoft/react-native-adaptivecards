import React from 'react';
import { View } from 'react-native';
import { CardText } from '../Basic/CardText';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class FactView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start'
            } },
            React.createElement(CardText, { style: {
                    color: this.styleConfig.fact.titleColor,
                    marginRight: this.styleConfig.fact.spacing,
                } }, element.title),
            React.createElement(CardText, { style: {
                    color: this.styleConfig.fact.valueColor,
                    marginLeft: this.styleConfig.fact.spacing,
                } }, element.value)));
    }
}
