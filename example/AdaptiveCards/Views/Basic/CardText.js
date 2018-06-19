import React from 'react';
import { Text, } from 'react-native';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class CardText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.fontFamily = DecStyleManager.getInstance().getFontFamily();
    }
    render() {
        const { style, children } = this.props;
        return (React.createElement(Text, Object.assign({}, this.props, { style: [
                {
                    fontFamily: this.fontFamily || undefined,
                },
                style
            ] }), children));
    }
}
